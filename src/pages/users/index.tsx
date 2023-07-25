import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Image, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined, } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import UploadImage from '@/components/upload';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { handleNotDelete, handleNotUpdate } from '@/utils/prompt';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  data: unknown;
  avatar: string | undefined;
  key: React.Key;
  _id?: string;
  username?: string;
  provider: string;
  createTime: string;
  updateTime: string;
}
interface UserData {
  avatar: any;
  code: number;
  _id: any;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const UserInfo = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  // const role_type = Boolean(token[0].role.map((item: any) => item.role_type).join(''))
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户类型',
      dataIndex: 'provider'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (_, record: any) => {
        if (typeof (record.avatar) === 'object') {
          return <Image width={50} height={50} src={record.avatar[0].thumbUrl} />
        }
        return <Image width={50} height={50} src={record.avatar} />
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
                userDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                userUpdate(item);
              }}
              style={{ marginRight: '5px' }}
            />
          </div>
        );
      },
    },
  ];
  // 表单数据
  const [updateForm] = Form.useForm();
  // 获取的用户详情
  const [userData, setUserData] = useState<any>([])
  // 用户列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 图片列表
  const [imageList, setImageList] = useState<any>();
  // 图片地址
  const [imgUrl, setImgUrl] = useState<any>([]);
  // 窗口
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // 获取用户列表数据
  useEffect(() => {
    props.BlogActions.asyncUserListAction(currentPage, pageSize, '').then((res: UserData) => {
      // 获取用户
      let { data, totalCount, page, pageSize } = res.data as unknown as UserData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 更新用户模态框
  const userUpdate = (item: UserData) => {
    updateForm.setFieldsValue(item);
    if (typeof (item.avatar) === 'string') {
      let data = item.avatar;
      let start = data.indexOf('images');
      let name = data.substring(start);
      item.avatar = [
        {
          name: name,
          thumbUrl: item.avatar,
        },
      ];
    }
    setImgUrl(item.avatar);
    setIsUpdateModalOpen(true);
    setUserData(item);
  };
  // 提交更新
  const handleUpdateConfirm = () => {
    if (role_type) {
      return handleNotUpdate();
    }
    let data = updateForm.getFieldsValue();

    if (typeof imageList === 'object') {
      data.avatar = imageList.url;
    } else {
      data.avatar = imageList;
    }
    if (imageList === undefined) {
      data.avatar = imgUrl[0].thumbUrl;
    }
    props.BlogActions.asyncUserUpdateAction({
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      //@ts-ignore
      id: userData._id,
    }).then(() => {
      message.success('更新成功');
      // 重新调用查询接口
      props.BlogActions.asyncUserListAction(currentPage, pageSize, '').then((res: UserData) => {
        // 获取用户
        let { data, totalCount, page, pageSize } = res.data as unknown as UserData;
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
  const handleUpdateCancel = () => {
    updateForm.resetFields();
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };
  // 删除用户
  const userDelete = (item: UserData) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it: any) => it._id !== item._id));
        message.success('用户删除成功');
        props.BlogActions.asyncUserDeleteAction(item._id).then(() => {
          props.BlogActions.asyncUserListAction(currentPage, pageSize, '').then((res: UserData) => {
            // 获取用户
            let { data, totalCount, page, pageSize } = res.data as unknown as UserData;
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
    props.BlogActions.asyncUserListAction(currentPage, pageSize, value).then((res: UserData) => {
      let { data, totalCount, page, pageSize } = res.data as unknown as UserData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncUserListAction(page, pageSize, params).then((res: UserData) => {
      // 获取列表数据
      let { data } = res.data as unknown as UserData;
      setList(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };
  // 获取图片信息
  const handleChange = (data: string) => {
    setImageList(data);
  };
  return (
    <div>
      <div className="title">
        <div></div>
        <Search
          className="search"
          allowClear
          placeholder="请输入用户名称"
          onSearch={onSearch}
          enterButton
        />
      </div>
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
            name="email"
            label="用户邮箱"
            rules={[{ required: true, message: '邮箱不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="头像"
            rules={[{ required: true, message: '头像不能为空' }]}
          >
            {/* @ts-ignore */}
            <UploadImage handleChange={handleChange} imgUrlArr={imgUrl} />
            {/* <Input /> */}
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
export default connect(null, mapDispatchToProps)(UserInfo);
