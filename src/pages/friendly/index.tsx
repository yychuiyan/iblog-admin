import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, message, Modal, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import './index.less';
import dayjs from 'dayjs';
import UploadImage from '@/components/upload';
import jwtDecode from 'jwt-decode';
import { handleNotAdd, handleNotDelete, handleNotUpdate } from '@/utils/prompt';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  key: React.Key;
  _id: string;
  username?: string;
  avatar?: string;
  articleIds?: string[];
  createTime: string;
  updateTime: string;
}
interface FriendlyData {
  avatar: any;
  _id: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const UserInfo = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '昵称',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '链接',
      dataIndex: 'link',
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
      title: '个人介绍',
      dataIndex: 'desc',
      render: text => {
        return <Tooltip title={text}>{text}</Tooltip>;
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
      render: item => {
        return (
          <div>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                role_type ? handleNotDelete() : friendlyDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                role_type ? handleNotUpdate() : friendlyUpdate(item);
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
  // 友链列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 更新窗口
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  // 保存当前更新的数据
  const [editData, setEditData] = useState({});
  // 图片列表
  const [imageList, setImageList] = useState<any>();
  // 图片地址
  const [imgUrl, setImgUrl] = useState<any>([]);
  // 获取友链列表数据
  useEffect(() => {
    props.BlogActions.asyncFriendlyListAction(currentPage, pageSize, '').then((res: FriendlyData) => {
      // 获取友链
      let { data, totalCount, page, pageSize } = res.data as unknown as FriendlyData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 新增友链
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 点击确定按钮
  const handleConfirm = async () => {
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const data = form.getFieldsValue();
    if (typeof imageList === 'object') {
      data.avatar = imageList.url;
    } else {
      data.avatar = imageList;
    }
    props.BlogActions.asyncFriendlyInsertAction({
      ...data,
    }).then(() => {
      // 重新调用查询接口
      props.BlogActions.asyncFriendlyListAction(currentPage, pageSize, '').then((res: FriendlyData) => {
        let { data, totalCount, page, pageSize } = res.data as unknown as FriendlyData;
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
  const friendlyUpdate = (item: FriendlyData) => {
    console.log("item", item);

    setIsModalUpdateOpen(true);
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
    setEditData(item);
  };
  // 更新操作
  const handleUpdateConfirm = () => {
    let value = updateForm.getFieldsValue();

    if (typeof imageList === 'object') {
      value.avatar = imageList.url;
    } else {
      value.avatar = imageList;
    }
    if (imageList === undefined) {
      value.avatar = imgUrl[0].thumbUrl;
    }
    props.BlogActions.asyncFriendlyUpdateAction({
      name: value.name,
      link: value.link,
      avatar: value.avatar,
      desc: value.desc,
      //@ts-ignore
      id: editData._id,
    }).then(() => {
      message.success('更新成功');
      props.BlogActions.asyncFriendlyListAction(currentPage, pageSize, '').then((res: FriendlyData) => {
        // 获取友链
        let { data, totalCount, page, pageSize } = res.data as unknown as FriendlyData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
      updateForm.resetFields();
      setIsModalUpdateOpen(false);
    });
  };
  // 删除友链
  const friendlyDelete = (item: FriendlyData) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it) => it._id !== item._id));
        message.success('友链删除成功');
        props.BlogActions.asyncFriendlyDeleteAction(item._id).then(() => {
          props.BlogActions.asyncFriendlyListAction(currentPage, pageSize, '').then((res: FriendlyData) => {
            // 获取友链
            let { data, totalCount, page, pageSize } = res.data as unknown as FriendlyData;
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
    props.BlogActions.asyncFriendlyListAction(currentPage, pageSize, value).then((res: FriendlyData) => {
      let { data, totalCount, page, pageSize } = res.data as unknown as FriendlyData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncUserListAction(page, pageSize, params).then((res: FriendlyData) => {
      // 获取列表数据
      let { data } = res.data as unknown as FriendlyData;
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
      <div className="cate_title">
        <Button type="primary" onClick={role_type ? handleNotAdd : showModal} className="btn">
          新增友链
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入昵称"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加友链</div>}
        okText="新增"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="name" label="昵称" rules={[{ required: true, message: '昵称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="link" label="链接" rules={[{ required: true, message: '链接不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="头像"
            // rules={[{ required: true, message: '头像不能为空' }]}
          >
            {/* @ts-ignore */}
            <UploadImage handleChange={handleChange} />
          </Form.Item>
          <Form.Item name="desc" label="描述" rules={[{ required: true, message: '描述不能为空' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isModalUpdateOpen}
        title={<div style={{ textAlign: 'left' }}>更新友链</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="name" label="昵称" rules={[{ required: true, message: '昵称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="link" label="链接" rules={[{ required: true, message: '链接不能为空' }]}>
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
          <Form.Item name="desc" label="描述" rules={[{ required: true, message: '描述不能为空' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={list}
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
export default connect(null, mapDispatchToProps)(UserInfo);
