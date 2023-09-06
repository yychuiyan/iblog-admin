import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, message, Modal, Switch, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import dayjs from 'dayjs';
import UploadImage from '@/components/upload';
import jwtDecode from 'jwt-decode';
import { handleNotAdd, handleNotDelete, handleNotUpdate, handleNotChangeStatus } from '@/utils/prompt';
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
  checked: any;
  status: any;
  avatar: any;
  _id: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const Friendly = (props: any) => {
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
      title: '网站状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record: any) => {
        return (
          <Switch
            checkedChildren={'正常'}
            unCheckedChildren={'异常'}
            checked={record.status}
            onChange={status => role_type ? handleNotChangeStatus() : record.checked === true ? onChangeStatus(status, record) : message.warning("网站已下线!")}
          />
        );
      },
    },
    {
      title: '友链状态',
      dataIndex: 'checked',
      width: 100,
      render: (_, record: any) => {
        return (
          <Switch
            checkedChildren={'上线'}
            unCheckedChildren={'下线'}
            checked={record.checked}
            onChange={checked => role_type ? handleNotChangeStatus() : record.status === false ? onChangeChecked(checked, record) : message.warning("仅异常网站可执行下线操作!")}
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
                friendlyDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                friendlyUpdate(item);
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
  const [pageSize, setPageSize] = useState(15);
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

  // 添加友链
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
    if (typeof imageList === 'object') {
      data.avatar = imageList.url;
    } else {
      data.avatar = imageList;
    }
    props.BlogActions.asyncFriendlyInsertAction({
      ...data,
    }).then(() => {
      message.success('友链添加成功')
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
    if (role_type) {
      return handleNotUpdate();
    }
    let value = updateForm.getFieldsValue();

    if (Boolean(imageList)) {
      value.avatar = imageList
    }
    if (Array.isArray(value.avatar)) {
      value.avatar = value.avatar[0].thumbUrl
    }
    props.BlogActions.asyncFriendlyUpdateAction({
      name: value.name,
      link: value.link,
      avatar: value.avatar,
      desc: value.desc,
      //@ts-ignore
      id: editData._id,
    }).then(() => {
      message.success('友链更新成功');
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
  // 更新友链网站状态
  const onChangeStatus = (status: boolean, row: FriendlyData) => {
    props.BlogActions.asyncFriendlyStatusUpdateAction({
      status: status,
      id: row._id,
    }).then((res: { code: number, msg: string }) => {
      if (res.code === 0) {
        row.status = !row.status;
        setList([...list]);
        message.success(res.msg);
      }
    });
  };
  // 更新友链状态
  const onChangeChecked = (checked: boolean, row: FriendlyData) => {
    props.BlogActions.asyncFriendlyCheckedUpdateAction({
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
  // 删除友链
  const friendlyDelete = (item: FriendlyData) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
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
    props.BlogActions.asyncFriendlyListAction(page, pageSize, params).then((res: FriendlyData) => {
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
  // 获取移除的图片信息
  const handleRemove = () => {
    setImageList('');
  };
  return (
    <div>
      <div className="title">
        <Button type="primary" onClick={showModal} className="btn">
          添加友链
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入想要查询的昵称"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加友链</div>}
        okText="添加"
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
            <UploadImage handleChange={handleChange} handleRemove={handleRemove} />
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
            <UploadImage handleChange={handleChange} imgUrlArr={imgUrl} handleRemove={handleRemove} />
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
export default connect(null, mapDispatchToProps)(Friendly);
