import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, Image, Input, message, Modal, Select, Space, Switch, Table } from 'antd';
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
import TextArea from 'antd/es/input/TextArea';
import { bookStatus, enums } from '@/utils/enum';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  desc: string;
  key: React.Key;
  _id: string;
  username?: string;
  avatar?: string;
  articleIds?: string[];
  createTime: string;
  updateTime: string;
}
interface ReaderData {
  avatar: any;
  checked: any;
  status: any;
  _id: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const Reader = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '书籍名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 150,
    },
    {
      title: '封面',
      dataIndex: 'avatar',
      render: (_, record: any) => {
        if (typeof (record.avatar) === 'object') {
          return <Image width={50} height={50} src={record.avatar[0].thumbUrl} />
        }
        return <Image width={50} height={50} src={record.avatar} />
      },
    },
    {
      title: '书籍简介',
      dataIndex: 'desc',
      render: (_, record) => {
        return <p className='introduction' style={{ width: '20rem' }}>{record.desc}</p>;
      },
    },
    {
      title: '阅读状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record: any) => {
        return (
          <Space direction="vertical" style={{ width: '5rem' }}>
            <Badge status={enums[record.status]} text={bookStatus[record.status]} />
          </Space>
        );
      },
    },
    {
      title: '书籍状态',
      dataIndex: 'checked',
      width: 100,
      render: (_, record: any) => {
        return (
          <Switch
            checkedChildren={'上架'}
            unCheckedChildren={'下架'}
            checked={record.checked}
            onChange={checked => role_type ? handleNotChangeStatus() : onChangeChecked(checked, record)}
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
                readerDelete(item);
              }}
              style={{ marginRight: '5px' }}
              disabled={item.checked}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                readerUpdate(item);
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
  // 书籍列表
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
  // 阅读状态
  const [readerStatus, setReaderStatus] = useState<any>(0)
  // 获取书籍列表数据
  useEffect(() => {
    props.BlogActions.asyncReaderListAction(currentPage, pageSize, '').then((res: ReaderData) => {
      // 获取书籍
      let { data, totalCount, page, pageSize } = res.data as unknown as ReaderData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 添加书籍
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
    if (data.status === "待阅读") {
      data.status = 0;
    } else {
      data.status = readerStatus
    }
    props.BlogActions.asyncReaderInsertAction({
      ...data
    }).then(() => {
      message.success('书籍添加成功')
      // 重新调用查询接口
      props.BlogActions.asyncReaderListAction(currentPage, pageSize, '').then((res: ReaderData) => {
        let { data, totalCount, page, pageSize } = res.data as unknown as ReaderData;
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
  const readerUpdate = (item: ReaderData) => {
    setIsModalUpdateOpen(true);
    const statusString = item.status.toString();
    updateForm.setFieldsValue({ ...item, status: statusString });
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
    if (value.status === "待阅读") {
      value.status = 0;
    }
    if (typeof imageList === 'object') {
      value.avatar = imageList.url;
    } else {
      value.avatar = imageList;
    }
    if (imageList === undefined) {
      value.avatar = imgUrl[0].thumbUrl;
    }
    props.BlogActions.asyncReaderUpdateAction({
      name: value.name,
      author: value.author,
      link: value.link,
      avatar: value.avatar,
      status: value.status,
      desc: value.desc,
      //@ts-ignore
      id: editData._id,
    }).then(() => {
      message.success('书籍更新成功');
      props.BlogActions.asyncReaderListAction(currentPage, pageSize, '').then((res: ReaderData) => {
        // 获取书籍
        let { data, totalCount, page, pageSize } = res.data as unknown as ReaderData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
      updateForm.resetFields();
      setIsModalUpdateOpen(false);
    });
  };
  // 更新书籍状态
  const onChangeChecked = (checked: boolean, row: ReaderData) => {
    props.BlogActions.asyncReaderCheckedUpdateAction({
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
  // 删除书籍
  const readerDelete = (item: ReaderData) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it) => it._id !== item._id));
        message.success('书籍删除成功');
        props.BlogActions.asyncReaderDeleteAction(item._id).then(() => {
          props.BlogActions.asyncReaderListAction(currentPage, pageSize, '').then((res: ReaderData) => {
            // 获取书籍
            let { data, totalCount, page, pageSize } = res.data as unknown as ReaderData;
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
    props.BlogActions.asyncReaderListAction(currentPage, pageSize, value).then((res: ReaderData) => {
      let { data, totalCount, page, pageSize } = res.data as unknown as ReaderData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncReaderListAction(page, pageSize, params).then((res: ReaderData) => {
      // 获取列表数据
      let { data } = res.data as unknown as ReaderData;
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
  // 阅读状态
  const handleBookStatusChange = (value: string) => {

    setReaderStatus(Number(value))
  };
  return (
    <div>
      <div className="title">
        <Button type="primary" onClick={showModal} className="btn">
          添加书籍
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
        title={<div style={{ textAlign: 'left' }}>添加书籍</div>}
        okText="添加"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="name" label="书籍名称" rules={[{ required: true, message: '书籍名称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="作者名称" rules={[{ required: true, message: '作者名称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="link" label="详情链接" rules={[{ required: true, message: '详情链接不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="阅读状态" initialValue="待阅读">
            <Select
              style={{ width: 120 }}
              onChange={handleBookStatusChange}
              options={[
                { value: '0', label: '待阅读' },
                { value: '1', label: '阅读中' },
                { value: '2', label: '已读完' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="封面"
          // rules={[{ required: true, message: '头像不能为空' }]}
          >
            {/* @ts-ignore */}
            <UploadImage handleChange={handleChange} handleRemove={handleRemove} />
          </Form.Item>
          <Form.Item name="desc" label="书籍描述" rules={[{ required: true, message: '描述不能为空' }]}>
            <TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
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
          <Form.Item name="name" label="书籍名称" rules={[{ required: true, message: '书籍名称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="作者名称" rules={[{ required: true, message: '作者名称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="link" label="详情链接" rules={[{ required: true, message: '详情链接不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="阅读状态">
            <Select
              style={{ width: 120 }}
              onChange={handleBookStatusChange}
              options={[
                { value: '0', label: '待阅读' },
                { value: '1', label: '阅读中' },
                { value: '2', label: '已读完' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="封面"
            rules={[{ required: true, message: '封面不能为空' }]}
          >
            {/* @ts-ignore */}
            <UploadImage handleChange={handleChange} imgUrlArr={imgUrl} handleRemove={handleRemove} />
            {/* <Input /> */}
          </Form.Item>
          <Form.Item name="desc" label="描述" rules={[{ required: true, message: '描述不能为空' }]}>
            <TextArea rows={6} />
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
export default connect(null, mapDispatchToProps)(Reader);
