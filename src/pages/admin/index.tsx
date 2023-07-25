import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Select, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined, CheckOutlined, CloseOutlined, } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  default: boolean | undefined;
  key: React.Key;
  _id?: string;
  username?: string;
  roleState?: boolean;
  articleIds?: string[];
  createTime: string;
  updateTime: string;
  role_type: number;
  role_name: string;
  rights: string[];
  create_time: string;
  update_time: string;
  rightsId: any;
  index: number;
  label: string;
  title?: string;
  pagepermission: number | boolean;
  grade: number;
  children?: DataType[] | string;
}
interface AdminData {
  code: number;
  _id: any;
  status: any;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const Adminstrator = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  // const role_type = Boolean(token[0].role.map((item: any) => item.role_type).join(''))
  const role_type = token[0].role[0].role_type

  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role: any) => {
        return role[0]?.role_name
      }
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      render: (_, record: any) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.status}
            disabled={role_type}
            onChange={checked => onChangeStatus(checked, record)}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: time => {
        return time === 0 ? time : dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: time => {
        return time === 0 ? time : dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, item: any) => {
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
              disabled={item.default ? item.default : role_type}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                AdminUpdate(item);
              }}
              disabled={role_type}
              style={{ marginRight: '5px' }}
            />
          </div>
        );
      },
    },
  ];
  // 表单数据
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  // 用户列表
  const [list, setList] = useState<DataType[]>([]);
  // 更新存储信息
  const [adminData, setAdminData] = useState<any>([])
  // 角色列表
  const [roleName, setRoleName] = useState<any>()
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // 获取用户列表数据
  useEffect(() => {
    props.BlogActions.asyncAdminListAction(currentPage, pageSize, '').then((res: any) => {
      // 获取用户
      let { data, totalCount, page, pageSize } = res.data;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 获取角色列表
  useEffect(() => {
    props.BlogActions.asyncRoleListAction('', '', '').then((res: AdminData) => {
      // 获取角色
      let { data } = res.data as unknown as AdminData;
      let roleName = data.map((item: any) => {
        return {
          "value": item._id,
          "label": item.role_name
        }
      })
      setRoleName(roleName);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 新增用户
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 点击确定按钮
  const handleConfirm = async () => {
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const data = form.getFieldsValue();

    message.success('用户新增成功');
    props.BlogActions.asyncAdminAddAction({
      username: data.username,
      password: data.password,
      role_id: data.role_id,
    }).then(() => {
      // 重新调用查询接口
      props.BlogActions.asyncAdminListAction(currentPage, pageSize, '').then((res: AdminData) => {
        // 获取用户
        let { data, totalCount, page, pageSize } = res.data as unknown as AdminData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
      form.resetFields();
      setIsModalOpen(false);
    });
  };
  // 更新用户状态
  const onChangeStatus = (checked: boolean, row: AdminData) => {
    props.BlogActions.asyncAdminStatusUpdateAction({
      status: checked,
      id: row._id,
    }).then(() => {
      row.status = checked;
      setList([...list]);
      message.success('状态更新成功');
    });
  };
  // 更新用户
  const AdminUpdate = (item: AdminData) => {
    setIsUpdateModalOpen(true);
    updateForm.setFieldsValue(item);
    setAdminData(item);
  };
  // 提交更新
  const handleUpdateConfirm = () => {
    let data = updateForm.getFieldsValue();

    props.BlogActions.asyncAdminUpdateAction({
      ...data,
      //@ts-ignore
      id: adminData._id,
    }).then(() => {
      message.success('更新成功');
      // 重新调用查询接口
      props.BlogActions.asyncAdminListAction(currentPage, pageSize, '').then((res: AdminData) => {
        // 获取用户
        let { data, totalCount, page, pageSize } = res.data as unknown as AdminData;

        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
      updateForm.resetFields();
      setIsUpdateModalOpen(false);
    });
  };
  // 关闭窗口
  const handleCancel = (e: any) => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleUpdateCancel = (e: any) => {
    updateForm.resetFields();
    setIsUpdateModalOpen(false);
  };
  // 删除用户
  const categoryDelete = (item: any) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it: any) => it._id !== item._id));
        message.success('用户删除成功');
        props.BlogActions.asyncAdminDeleteAction(item._id).then(() => {
          props.BlogActions.asyncAdminListAction(currentPage, pageSize, '').then((res: any) => {
            // 获取用户
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
    props.BlogActions.asyncAdminListAction(currentPage, pageSize, value).then((res: any) => {
      let { data, totalCount, page, pageSize } = res.data;

      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: any, pageSize: any, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncAdminListAction(page, pageSize, params).then((res: any) => {
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
        <Button type="primary" disabled={role_type} onClick={showModal} className="btn">
          新增用户
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入用户名称"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加用户</div>}
        okText="新增"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="username"
            label="用户名称"
            rules={[{ required: true, message: '用户名称不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="用户密码"
            rules={[{ required: true, message: '用户密码不能为空' }]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item
            name="role_id"
            label="角色"
            rules={[{ required: true, message: '角色不能为空' }]}
          >
            <Select
              // defaultValue=""
              // style={{ width: 120 }}
              // onChange={handleChange}
              options={roleName}
            />
          </Form.Item>

        </Form>
      </Modal>
      <Modal
        open={isUpdateModalOpen}
        title={<div style={{ textAlign: 'left' }}>更新用户</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="username"
            label="用户名称"
            rules={[{ required: true, message: '用户名称不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role_id"
            label="角色"
            rules={[{ required: true, message: '角色不能为空' }]}
          >
            <Select
              // defaultValue=""
              // style={{ width: 120 }}
              // onChange={handleChange}
              options={roleName}
            />
          </Form.Item>

        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={(item: any) => {
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Adminstrator);
