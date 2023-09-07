import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { handleNotAdd, handleNotDelete, handleNotUpdate } from '@/utils/prompt';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  key?: React.Key;
  _id: string;
  name: string;
  createTime: string;
  updateTime: string;
}
interface CategoryData {
  index: any;
  name: any;
  data: {
    data: DataType[];
    totalCount: number;
    page: number;
    pageSize: number;
  };
}
const NavigationCategory = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type

  const columns: ColumnsType<DataType> = [
    {
      title: '分类名称',
      dataIndex: 'name',
      width: '20rem',
    },
    {
      title: '分类索引',
      dataIndex: 'index',
      key: 'index',
      width: '20rem',
    },
    {
      title: '网站数量',
      dataIndex: 'navigationNum',
      key: 'navigationNum',
      width: '20rem',
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
                categoryDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                categoryUpdate(item);
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
  // 分类列表
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
  // 更新的数据
  const [editItems, setEditItems] = useState<any>([])
  // 获取分类列表数据
  useEffect(() => {
    props.BlogActions.asyncNavigationCategoriesAction(currentPage, pageSize, '').then((res: CategoryData) => {
      // 获取分类
      let { data, totalCount, page, pageSize } = res.data;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 新增分类
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
    props.BlogActions.asyncNavigationCategoryAddAction({
      name: data.title,
      index: data.index,
    }).then(() => {
      message.success('分类新增成功');
      form.resetFields();
      setIsModalOpen(false);
      // 重新调用查询接口
      props.BlogActions.asyncNavigationCategoriesAction(currentPage, pageSize, '').then((res: CategoryData) => {
        let { data } = res.data;
        setList(data);
      });
    });
  };
  // 点击更新
  const categoryUpdate = (item: CategoryData) => {
    updateForm.setFieldsValue({ name: item.name, index: item.index });
    setIsModalUpdateOpen(true);
    setEditItems(item)
  };
  // 更新操作
  const handleUpdateConfirm = () => {
    if (role_type) {
      return handleNotUpdate();
    }
    let value = updateForm.getFieldsValue();
    // 执行更新
    props.BlogActions.asyncNavigationCategoryUpdateAction({
      name: value.name,
      index: value.index,
      id: editItems._id,
    }).then(() => {
      message.success("导航分类更新成功")
      // 刷新列表数据
      props.BlogActions.asyncNavigationCategoriesAction(currentPage, pageSize, '').then((res: CategoryData) => {
        // 获取分类
        let { data, totalCount, page, pageSize } = res.data;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
    });
    updateForm.resetFields();
    setIsModalUpdateOpen(false);
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
  // 删除分类
  const categoryDelete = (item: { _id: string; }) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        props.BlogActions.asyncNavigationCategoryDeleteAction(item._id).then((res: { code: number; } | undefined) => {
          if (res === undefined) {
            message.error('分类删除失败,请稍后再试');
            return false;
          }
          if (res.code === 40001) {
            message.error('导航中有关联该分类信息，请解绑后再次执行删除操作');
            return false;
          }

          // 先将要删除的数据过滤掉再调用接口
          setList(list.filter((it: { _id: string | undefined }) => it._id !== item._id));
          message.success('分类删除成功');
          props.BlogActions.asyncNavigationCategoriesAction(currentPage, pageSize, '').then((res: CategoryData) => {
            // 获取分类
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
  // 搜索
  const onSearch = (value: string) => {
    props.BlogActions.asyncNavigationCategoriesAction(currentPage, pageSize, value).then((res: CategoryData) => {
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
    props.BlogActions.asyncNavigationCategoriesAction(page, pageSize, params).then((res: CategoryData) => {
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
          添加分类
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入分类名称"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加分类</div>}
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
            rules={[{ required: true, message: '分类名称不能为空' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item
            name="index"
            label="分类索引"
            rules={[{ required: true, message: '分类索引不能为空' }]}
          >
            <InputNumber min={1} max={500} />
          </Form.Item>
        </Form>
      </Modal>
      {/* 更新操作 */}
      <Modal
        open={isModalUpdateOpen}
        title={<div style={{ textAlign: 'left' }}>更新书籍</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '分类名称不能为空' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item
            name="index"
            label="分类索引"
            rules={[{ required: true, message: '分类索引不能为空' }]}
          >
            <InputNumber min={1} max={500} />
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
export default connect(null, mapDispatchToProps)(NavigationCategory);
