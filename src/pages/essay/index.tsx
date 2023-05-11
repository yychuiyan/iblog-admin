import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, message, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import './index.less';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '@/components/upload';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  key: React.Key;
  _id?: string;
  content?: string;
  createTime: string;
  updateTime: string;
}
const Essay = (props: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '随笔',
      dataIndex: 'content',
      render: (_, record: any) => {
        return <p className='essay_content' style={{ width: '12rem' }}>{record.content}</p>;
      },
    },
    {
      title: '封面',
      dataIndex: 'cover',
      render: (_, record: any) => {
        return <Image width={50} height={50} src={record.cover}></Image>;
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
        return time === 0 ? time : dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
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
                EssayDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                EssayUpdate(item);
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
  // 随笔列表
  const [list, setList] = useState([]);
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
  // 图片
  const [imageList, setImageList] = useState<any>();
  // 图片地址
  const [imgUrl, setImgUrl] = useState<any>([]);
  // 保存当前更新的数据
  const [editData, setEditData] = useState({});
  // 获取随笔列表数据
  useEffect(() => {
    props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: any) => {
      // 获取随笔
      let { data, totalCount, page, pageSize } = res.data;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 新增随笔
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 点击确定按钮新增
  const handleConfirm = async () => {
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const data = form.getFieldsValue();
    if (typeof imageList === 'object') {
      data.cover = imageList.url;
    } else {
      data.cover = imageList;
    }
    props.BlogActions.asyncEssayInsertAction({
      ...data,
    }).then((res: any) => {
      message.success('新增随笔成功!')
      setImageList('')
      form.resetFields();
      setIsModalOpen(false);
      // 重新调用查询接口
      props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: any) => {
        let { data } = res.data;
        setList(data);
      });
    });
  };
  // 关闭窗口
  const handleCancel = (e: any) => {
    form.resetFields();
    setIsModalOpen(false);
  };
  // 关闭窗口
  const handleUpdateCancel = (e: any) => {
    updateForm.resetFields();
    setIsModalUpdateOpen(false);
  };
  const EssayUpdate = (item: any) => {
    let data = item.cover === undefined ? '' : item.cover;
    let start = data.indexOf('images');
    let name = data.substring(start);
    item.cover = [
      {
        name: name,
        thumbUrl: item.cover,
      },
    ];
    setImgUrl(item.cover);
    setIsModalUpdateOpen(true);
    updateForm.setFieldsValue(item);
    setEditData(item);
  };
  const handleUpdateConfirm = () => {
    let value = updateForm.getFieldsValue();
    if (typeof imageList === 'object') {
      value.cover = imageList.url;
    } else {
      value.cover = imageList;
    }
    if (imageList === undefined) {
      value.cover = imgUrl[0].thumbUrl;
    }

    props.BlogActions.asyncEssayUpdateAction({
      content: value.content,
      cover: value.cover,
      //@ts-ignore
      id: editData._id,
    }).then((res: any) => {
      message.success('更新成功');
      props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: any) => {
        // 获取随笔
        let { data, totalCount, page, pageSize } = res.data;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
      updateForm.resetFields();
      setIsModalUpdateOpen(false);
    });
  };
  // 删除随笔
  const EssayDelete = (item: any) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it: any) => it._id !== item._id));
        message.success('随笔删除成功');
        props.BlogActions.asyncEssayDeleteAction(item._id).then(() => {
          props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: any) => {
            // 获取随笔
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
    props.BlogActions.asyncEssayListAction(currentPage, pageSize, value).then((res: any) => {
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
    props.BlogActions.asyncUserListAction(page, pageSize, params).then((res: any) => {
      // 获取列表数据
      let { data } = res.data;
      setList(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };
  // 获取图片信息
  const handleChange = (data: any) => {
    setImageList(data);
  };
  // 获取移除的图片信息
  const handleRemove = (val: any) => {
    setImageList('')
    setImgUrl([])
  }
  return (
    <div>
      <div className="cate_title">
        <Button type="primary" onClick={showModal} className="btn">
          新增随笔
        </Button>
        <Search
          className="search"
          allowClear
          placeholder="请输入随笔"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加随笔</div>}
        okText="新增"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="content"
            label="随笔"
            rules={[{ required: true, message: '随笔不能为空' }]}
          >
            <TextArea autoSize={{ minRows: 6 }} />
          </Form.Item>
          <Form.Item
            name="cover"
            label="随笔图片"
          >
            {/* @ts-ignore */}
            <UploadImage handleChange={handleChange} handleRemove={handleRemove} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isModalUpdateOpen}
        title={<div style={{ textAlign: 'left' }}>更新随笔</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="content"
            label="随笔"
            rules={[{ required: true, message: '随笔不能为空' }]}
          >
            <TextArea autoSize={{ minRows: 6 }} />
          </Form.Item>
          <Form.Item
            name="cover"
            label="文章封面"
          >
            {/* @ts-ignore */}
            <UploadImage imgUrlArr={imgUrl} handleChange={handleChange} handleRemove={handleRemove} />
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
export default connect(null, mapDispatchToProps)(Essay);
