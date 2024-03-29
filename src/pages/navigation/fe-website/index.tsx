import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, message, Modal, Select, Switch, Table, Tag, Tooltip } from 'antd';
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
const { Option } = Select;
const { TextArea } = Input;
interface DataType {
  index: string;
  desc: string;
  name: any;
  link: string;
  key: React.Key;
  _id: string;
  username?: string;
  avatar?: string;
  articleIds?: string[];
  createTime: string;
  updateTime: string;
}
interface NavigationData {
  classify: string;
  status: any;
  avatar: any;
  _id: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const FE_Website = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '网站名称',
      dataIndex: 'title',
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
      title: '链接',
      dataIndex: 'link',
      render: (_, record) => {
        return (
          <div className='link' style={{ width: '10rem' }}>
            <Tooltip title={record.link}>{record.link}</Tooltip>
          </div>
        )
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      render: (_, record) => {
        return <div className='link' style={{ width: '10rem' }}>
          <Tooltip title={record.desc}>{record.desc}</Tooltip>
        </div>;
      },
    },
    {
      title: '所属分类',
      dataIndex: 'category',
      width: 100,
      render: text => {
        return <Tooltip title={text}>{text}</Tooltip>;
      },
    },
    {
      title: '索引',
      dataIndex: 'index',
      width: 100,
      render: (_, record) => {
        return (
          <Tag style={{ marginRight: 10 }} key={record._id}>
            {record.index}
          </Tag>
        )
      },

    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record: any) => {
        return (
          <Switch
            checkedChildren={'上线'}
            unCheckedChildren={'下线'}
            checked={record.status}
            onChange={status => role_type ? handleNotChangeStatus() : onChangeStatus(status, record)}
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
                navigationDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigationUpdate(item);
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
  // 常用网站
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
  // 分类信息
  const [categoryList, setCategoryList] = useState<DataType[]>([]);
  // 当前分类名称
  const [categoryName, setCategoryName] = useState<String>()
  // 获取分类列表
  useEffect(() => {
    props.BlogActions.asyncNavigationCategoriesAction(currentPage, pageSize, '').then((res: NavigationData) => {
      let { data } = res.data as unknown as NavigationData;
      setCategoryList(data);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 获取常用网站数据
  useEffect(() => {
    props.BlogActions.asyncNavigationListAction(currentPage, pageSize, '', '常用网站').then((res: NavigationData) => {
      // 获取常用网站
      let { data, totalCount, page, pageSize } = res.data as unknown as NavigationData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 添加网站
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
    if (typeof imageList === 'undefined') {
      data.avatar = "http://dummyimage.com/100x100"
    } else {
      if (typeof imageList === 'object') {
        data.avatar = imageList.url;
      } else {
        data.avatar = imageList;
      }
    }
    const result = categoryList.filter(item => item.name === data.category)
    props.BlogActions.asyncNavigationInsertAction({
      classify: "常用网站",
      index: result[0]?.index,
      ...data,
    }).then(() => {
      message.success('常用网站添加成功')
      form.resetFields();
      setIsModalOpen(false);
      // 重新调用查询接口
      props.BlogActions.asyncNavigationListAction(currentPage, pageSize, '', '常用网站').then((res: NavigationData) => {
        let { data, totalCount, page, pageSize } = res.data as unknown as NavigationData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
    });
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
  const navigationUpdate = (item: NavigationData) => {
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
    if (typeof value.avatar === 'object') {
      value.avatar = value.avatar?.url
    }
    const result = categoryList.filter(item => item.name === categoryName)
    props.BlogActions.asyncNavigationUpdateAction({
      title: value.title,
      link: value.link,
      avatar: value.avatar,
      desc: value.desc,
      category: value.category,
      index: result[0]?.index,
      classify: "常用网站",
      //@ts-ignore
      id: editData._id,
    }).then(() => {
      message.success('常用网站更新成功');
      updateForm.resetFields();
      setIsModalUpdateOpen(false);
      props.BlogActions.asyncNavigationListAction(currentPage, pageSize, '', '常用网站').then((res: NavigationData) => {
        // 获取常用网站
        let { data, totalCount, page, pageSize } = res.data as unknown as NavigationData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
    });
  };
  // 选中分类
  const handleChangeCategory = (name: string) => {
    setCategoryName(name)
  }
  // 更新常用网站网站状态
  const onChangeStatus = (status: boolean, row: NavigationData) => {
    props.BlogActions.asyncNavigationStatusUpdateAction({
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
  // 删除常用网站
  const navigationDelete = (item: NavigationData) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it) => it._id !== item._id));
        message.success('常用网站删除成功');
        props.BlogActions.asyncNavigationDeleteAction(item._id).then(() => {
          props.BlogActions.asyncNavigationListAction(currentPage, pageSize, '', '常用网站').then((res: NavigationData) => {
            // 获取常用网站
            let { data, totalCount, page, pageSize } = res.data as unknown as NavigationData;
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
    props.BlogActions.asyncNavigationListAction(currentPage, pageSize, value, '常用网站').then((res: NavigationData) => {
      let { data, totalCount, page, pageSize } = res.data as unknown as NavigationData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncNavigationListAction(page, pageSize, params, '常用网站').then((res: NavigationData) => {
      // 获取列表数据
      let { data } = res.data as unknown as NavigationData;
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
          添加网站
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入想要查询的网站名称"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加网站</div>}
        okText="添加"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="title" label="网站名称" rules={[{ required: true, message: '网站名称不能为空' }]}>
            <Input placeholder="请输入网站名称" />
          </Form.Item>
          <Form.Item name="link" label="链接" rules={[{ required: true, message: '链接不能为空' }]}>
            <Input placeholder="请输入链接信息" />
          </Form.Item>
          <Form.Item
            label="二级分类"
            name="category"
            rules={[{ required: true, message: '二级分类不能为空' }]}
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="请选择二级分类信息"
              optionFilterProp="children"
            >
              {categoryList.map((item) => (
                <Option value={item.name} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="avatar"
            label="封面"
          // rules={[{ required: true, message: '头像不能为空' }]}
          >
            {/* @ts-ignore */}
            <UploadImage handleChange={handleChange} handleRemove={handleRemove} />
          </Form.Item>
          <Form.Item name="desc" label="描述" rules={[{ required: true, message: '描述不能为空' }]}>
            <TextArea rows={4} placeholder="请输入描述信息" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isModalUpdateOpen}
        title={<div style={{ textAlign: 'left' }}>更新常用网站</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="title" label="网站名称" rules={[{ required: true, message: '网站名称不能为空' }]}>
            <Input placeholder="请输入网站名称" />
          </Form.Item>
          <Form.Item name="link" label="链接" rules={[{ required: true, message: '链接不能为空' }]}>
            <Input placeholder="请输入链接信息" />
          </Form.Item>
          <Form.Item
            label="分类"
            name="category"
            rules={[{ required: true, message: '分类不能为空' }]}
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="请选择分类信息"
              optionFilterProp="children"
              onChange={handleChangeCategory}
            >
              {categoryList.map((item: any) => (
                <Option value={item.name} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="avatar"
            label="封面"
          // rules={[{ required: true, message: '封面不能为空' }]}
          >
            {/* @ts-ignore */}
            <UploadImage handleChange={handleChange} imgUrlArr={imgUrl} handleRemove={handleRemove} />
            {/* <Input /> */}
          </Form.Item>
          <Form.Item name="desc" label="描述" rules={[{ required: true, message: '描述不能为空' }]}>
            <TextArea rows={4} placeholder="请输入描述信息" />
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
export default connect(null, mapDispatchToProps)(FE_Website);
