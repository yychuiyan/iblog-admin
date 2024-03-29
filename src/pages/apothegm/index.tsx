import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import TextArea from 'antd/es/input/TextArea';
import { handleNotAdd, handleNotChangeStatus, handleNotDelete, handleNotUpdate } from '@/utils/prompt';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  author: string;
  key: React.Key;
  _id: string;
  checked: boolean;
  content: string;
  createTime: string;
  updateTime: string;
}
interface ApothegmData {
  checked: any;
  avatar: any;
  _id: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const ApothegmList = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type

  const columns: ColumnsType<DataType> = [
    {
      title: '作者',
      dataIndex: 'author',
      render: (_, record) => {
        return <p className='introduction' style={{ width: '6rem' }}>{record.author}</p>;
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      render: (_, record) => {
        return <p className='introduction' style={{ width: '20rem' }}>{record.content}</p>;
      },
    },
    {
      title: '展示状态',
      dataIndex: 'checked',
      render: (_, record: any) => {
        return (
          <Switch
            checkedChildren={'上线'}
            unCheckedChildren={'下线'}
            checked={record.checked}
            onChange={checked => role_type ? handleNotChangeStatus() : onChangeStatus(checked, record)}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: time => {
        return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: time => {
        return time === 0 ? 0 : dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      className: 'handle_btn',
      render: item => {
        return (
          <div>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                ApothegmDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                ApothegmUpdate(item);
              }}
              style={{ marginRight: '5px' }}
            />
          </div>
        );
      },
    },
  ];
  // 表单数据
  const [form] = Form.useForm();
  // 更新表单
  const [updateForm] = Form.useForm();
  // 警句列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(15);
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 更新窗口
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  // 保存当前更新的数据
  const [editData, setEditData] = useState({});
  // 获取警句列表数据
  useEffect(() => {
    props.BlogActions.asyncApothegmListAction(currentPage, pageSize, '').then((res: ApothegmData) => {
      // 获取警句
      let { data, totalCount, page, pageSize } = res.data as unknown as ApothegmData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 新增警句
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
    props.BlogActions.asyncApothegmAddAction({
      author: data.author,
      content: data.content,
    }).then(() => {
      message.success('添加成功')
      // 重新调用查询接口
      props.BlogActions.asyncApothegmListAction(currentPage, pageSize, '').then((res: ApothegmData) => {
        let { data, totalCount, page, pageSize } = res.data as unknown as ApothegmData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
    });
    form.resetFields();
    setIsModalOpen(false);
  };
  // 关闭窗口
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  // 关闭窗口
  const handleUpdateCancel = () => {
    updateForm.resetFields();
    setIsModalUpdateOpen(false);
  };
  // 点击更新
  const ApothegmUpdate = (item: ApothegmData) => {
    setIsModalUpdateOpen(true);
    updateForm.setFieldsValue(item);
    setEditData(item);
  };
  // 更新操作
  const handleUpdateConfirm = () => {
    if (role_type) {
      return handleNotUpdate()
    }
    let value = updateForm.getFieldsValue();
    props.BlogActions.asyncApothegmUpdateAction({
      author: value.author,
      content: value.content,
      //@ts-ignore
      id: editData._id,
    }).then(() => {
      message.success('更新成功');
      props.BlogActions.asyncApothegmListAction(currentPage, pageSize, '').then((res: ApothegmData) => {
        // 获取警句
        let { data, totalCount, page, pageSize } = res.data as unknown as ApothegmData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
      updateForm.resetFields();
      setIsModalUpdateOpen(false);
    });
  };
  // 删除警句
  const ApothegmDelete = (item: ApothegmData) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it) => it._id !== item._id));
        message.success('删除成功');
        props.BlogActions.asyncApothegmDeleteAction(item._id).then(() => {
          props.BlogActions.asyncApothegmListAction(currentPage, pageSize, '').then((res: ApothegmData) => {
            // 获取警句
            let { data, totalCount, page, pageSize } = res.data as unknown as ApothegmData;
            setList(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          });
        });
      },
    });
  };
  // 更新警句状态
  const onChangeStatus = (checked: boolean, row: ApothegmData) => {
    props.BlogActions.asyncApothegmStatusUpdateAction({
      checked: checked,
      id: row._id,
    }).then((res: { code: number, msg: string }) => {
      if (res.code === 0) {
        row.checked = !row.checked;
        setList([...list]);
        message.success(res.msg);
      }
    });
  };
  // 搜索
  const onSearch = (value: string) => {
    props.BlogActions.asyncApothegmListAction(currentPage, pageSize, value).then((res: ApothegmData) => {
      let { data, totalCount, page, pageSize } = res.data as unknown as ApothegmData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncUserListAction(page, pageSize, params).then((res: ApothegmData) => {
      // 获取列表数据
      let { data } = res.data as unknown as ApothegmData;
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
          添加名言警句
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入作者名称"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加名言警句</div>}
        okText="添加"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="author" label="作者" rules={[{ required: true, message: '作者不能为空' }]}>
            <Input placeholder="请输入作者名称" />
          </Form.Item>
          <Form.Item name="content" label="警句内容" rules={[{ required: true, message: '内容不能为空' }]}>
            <TextArea rows={5} placeholder="请输入警句内容" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isModalUpdateOpen}
        title={<div style={{ textAlign: 'left' }}>更新名言警句</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="author" label="作者" rules={[{ required: true, message: '作者不能为空' }]}>
            <Input placeholder="请输入作者名称" />
          </Form.Item>
          <Form.Item name="content" label="警句内容" rules={[{ required: true, message: '内容不能为空' }]}>
            <TextArea rows={5} placeholder="请输入警句内容" />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={list}
        scroll={{ y: 'calc(100vh - 240px)', x: true }}
        rowKey={(item) => {
          return item._id + Date.now();
        }}
        pagination={false}
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
export default connect(null, mapDispatchToProps)(ApothegmList);
