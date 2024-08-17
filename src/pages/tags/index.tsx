import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, FormInstance, Input, InputRef, message, Modal, Table, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import jwtDecode from 'jwt-decode';
import { handleNotAdd, handleNotDelete, handleNotUpdate, handleNotChangeStatus } from '@/utils/prompt';
import dayjs from 'dayjs';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  key?: React.Key;
  _id: string;
  name: string;
  articleNum?: Number;
  createTime?: string;
  updateTime?: string;
  status?: Boolean;

}
interface TagsData {
  status: boolean | undefined;
  _id: string;
  code: number;
  name: string | undefined;
  data: {
    data: DataType[];
    totalCount: number;
    page: number;
    pageSize: number;
  };
}
const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
  index: number;
}
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      return errInfo;
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const ArticleTag = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  // 保存
  const handleSave = (record: DataType) => {
    let rawData = list.map((item: DataType) => {
      if (item._id === record._id) {
        return {
          _id: item._id,
          name: record.name,
          articleNum: record.articleNum,
          createTime: record.createTime,
          updateTime: record.updateTime,
        };
      }
      return item;
    });
    setList(rawData);
    // message.success("更新成功")
    // 执行更新
    props.BlogActions.asyncTagUpdateAction({
      name: record.name,
      id: record._id,
    }).then(() => {
      // 刷新列表数据
      props.BlogActions.asyncTagsAction(currentPage, pageSize, '').then((res: TagsData) => {
        // 获取标签
        let { data, totalCount, page, pageSize } = res.data;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
    });
  };
  const columns: ColumnsType<DataType | TagsData> = [
    {
      title: '标签名称(点击可编辑)',
      dataIndex: 'name',
      key: 'name',
      width: '20rem',
      onCell: (record) => ({
        record,
        editable: record.status,
        dataIndex: 'name',
        title: '标签名称',
        handleSave: role_type ? handleNotUpdate : handleSave,
      }),
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
      key: 'articleNum',
      width: '10rem'
    },
    {
      title: '标签状态',
      dataIndex: 'articleNum',
      render: (_, record: any) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.status}
            // disabled={role_type}
            onChange={checked => role_type ? handleNotChangeStatus() : onChangeStatus(checked, record)}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      render: item => {
        return (
          <div>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                TagDelete(item);
              }}
              style={{ marginRight: '5px' }}
              disabled={item.status}
            />
          </div>
        );
      },
    },
  ];
  // 表单数据
  const [form] = Form.useForm();
  // 标签列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(15);
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 获取标签列表数据
  useEffect(() => {
    props.BlogActions.asyncTagsAction(currentPage, pageSize, '').then((res: TagsData) => {
      // 获取标签
      let { data, totalCount, page, pageSize } = res.data;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 新增标签
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 点击确定按钮
  const handleConfirm = async () => {
    if (role_type) {
      return handleNotAdd()
    }
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const data = form.getFieldsValue();
    message.success('标签新增成功');
    form.resetFields();
    setIsModalOpen(false);
    props.BlogActions.asyncTagAddAction({
      name: data.title,
    }).then(() => {
      // 重新调用查询接口
      props.BlogActions.asyncTagsAction(currentPage, pageSize, '').then((res: TagsData) => {
        let { data } = res.data;
        setList(data);
      });
    });
  };
  // 关闭窗口
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  // 删除标签
  const TagDelete = (item: DataType) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        props.BlogActions.asyncTagDeleteAction(item._id).then((res: TagsData) => {
          if (res.code === 40001) {
            message.error('文章中有关联该标签信息，请解绑后再次执行删除操作');
            return false;
          }
          // 先将要删除的数据过滤掉再调用接口
          setList(list.filter((it) => it._id !== item._id));
          message.success('标签删除成功');
          props.BlogActions.asyncTagsAction(currentPage, pageSize, '').then((res: TagsData) => {
            // 获取标签
            let { data, totalCount, page, pageSize } = res.data;
            setList(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          });
        });
      },
    });
  };
  // 更新标签状态
  const onChangeStatus = (checked: boolean, row: TagsData) => {
    props.BlogActions.asyncTagStatusUpdateAction({
      status: row.status,
      id: row._id,
    }).then((res: TagsData) => {
      if (res.code === 40001) {
        message.error('文章中有关联该标签信息，请解绑后再次执行状态变更操作');
        return false;
      }
      row.status = !row.status;
      setList([...list]);
      message.success('状态更新成功');
      // props.BlogActions.asyncTagsAction(currentPage, pageSize, "").then((res: any) => {
      //   setList(res.data)
      // })
    });
  };
  // 搜索
  const onSearch = (value: string) => {
    props.BlogActions.asyncTagsAction(currentPage, pageSize, value).then((res: TagsData) => {
      let { data, totalCount, page, pageSize } = res.data;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncTagsAction(page, pageSize, params).then((res: TagsData) => {
      // 获取列表数据
      let { data } = res.data;
      setList(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };
  return (
    <div>
      <div className="title">
        <Button type="primary" onClick={showModal} className="btn">
          添加标签
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入标签名称"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加标签</div>}
        okText="新增"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="title"
            label="名称"
            rules={[{ required: true, message: '标签名称不能为空' }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={list}
        scroll={{ y: 'calc(100vh - 260px)', x: true }}
        rowKey={(item) => {
          return item._id + Date.now();
        }}
        pagination={false}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      />
      <MyPagination
        pageSize={pageSize}
        currentPage={currentPage}
        total={total}
        onChange={onChangePage}
      ></MyPagination>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(ArticleTag);
