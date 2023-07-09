import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import './index.less';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import UploadImage from '@/components/uploadMany';
import Editor from 'for-editor';
import { handleNotAdd, handleNotDelete, handleNotUpdate } from '@/utils/prompt';
const { confirm } = Modal;
const { Search } = Input;
interface CoverData {
  url: string;
  name: string;
  thumbUrl: string;
}
interface DataType {
  key: React.Key;
  _id: string;
  content?: string;
  createTime: string;
  updateTime: string;
}
interface EssayData {
  cover: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const Essay = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '随笔',
      dataIndex: 'content',
      render: (_, record) => {
        return <p className='essay_content' style={{ width: '12rem' }}>{record.content}</p>;
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
                essayDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                essayUpdate(item);
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
  // 图片
  const [imageList, setImageList] = useState<any>([]);
  // 图片地址
  const [imgUrl, setImgUrl] = useState<any>([]);
  // 保存当前更新的数据
  const [editData, setEditData] = useState({});
  // 定义ref
  const editorRef = useRef<any>();
  // 获取随笔列表数据
  useEffect(() => {
    props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: EssayData) => {
      // 获取随笔
      let { data, totalCount, page, pageSize } = res.data as unknown as EssayData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 添加随笔
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 点击确定按钮添加
  const handleConfirm = async () => {
    if (role_type) {
      return handleNotAdd()
    }
    // 校验form值 校验通过后获取值
    await form.validateFields();
    // 获取表单值
    const datas = form.getFieldsValue();

    datas.cover = imageList

    let coverArray = datas.cover.map((item: CoverData) => {
      return {
        name: item.name,
        thumbUrl: item.thumbUrl
      }
    })
    let newData = {
      content: datas.content,
      cover: coverArray
    }

    props.BlogActions.asyncEssayInsertAction({
      ...newData,
    }).then(() => {
      message.success('添加随笔成功!')
      setImageList('')
      form.resetFields();
      setIsModalOpen(false);
      // 重新调用查询接口
      props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: EssayData) => {
        let { data } = res.data as unknown as EssayData;
        setList(data);
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
  // 更新
  const essayUpdate = (item: EssayData) => {
    setImageList(item)
    setImgUrl(item.cover);
    setIsModalUpdateOpen(true);
    updateForm.setFieldsValue(item);
    setEditData(item);
  };
  // 提交更新
  const handleUpdateConfirm = () => {
    if (role_type) {
      return handleNotUpdate();
    }
    let data = updateForm.getFieldsValue();
    let coverArray = imageList.cover.map((item: CoverData) => {
      return {
        name: item.name,
        thumbUrl: item.thumbUrl
      }
    })
    let newData = {
      content: data.content,
      cover: coverArray
    }

    props.BlogActions.asyncEssayUpdateAction({
      ...newData,
      //@ts-ignore
      id: editData._id,
    }).then(() => {
      message.success('更新成功');
      props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: EssayData) => {
        // 获取随笔
        let { data, totalCount, page, pageSize } = res.data as unknown as EssayData;
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
  const essayDelete = (item: DataType) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it) => it._id !== item._id));
        message.success('随笔删除成功');
        props.BlogActions.asyncEssayDeleteAction(item._id).then(() => {
          props.BlogActions.asyncEssayListAction(currentPage, pageSize, '').then((res: EssayData) => {
            // 获取随笔
            let { data, totalCount, page, pageSize } = res.data as unknown as EssayData;
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
    props.BlogActions.asyncEssayListAction(currentPage, pageSize, value).then((res: EssayData) => {
      let { data, totalCount, page, pageSize } = res.data as unknown as EssayData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncEssayListAction(page, pageSize, params).then((res: EssayData) => {
      // 获取列表数据
      let { data } = res.data as unknown as EssayData;
      setList(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };

  // 获取图片信息
  const handleChange = (data: CoverData) => {
    let newData = {
      name: data.name,
      thumbUrl: data.url
    }
    imageList?.cover ? imageList.cover.push(newData) : imageList.push(newData)
    setImageList(imageList)
  };
  // 获取移除的图片信息
  const handleRemove = (val: { name: string }) => {
    let newImageList = imageList?.cover ? imageList.cover.filter((item: { name: string }) => item.name !== val.name) : imageList.filter((item: { name: string }) => item.name !== val.name)
    // imageList.push('')
    setImageList({
      ...imageList,
      cover: newImageList
    })
  }
  // 添加图片
  const addImg = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    // 上传图片接口
    props.BlogActions.asyncFileUploadAction(formData).then((res: CoverData) => {
      if (res) {
        // 如果返回值
        editorRef.current.$img2Url(file.name, res.url);
      }
    });
  };
  return (
    <div>
      <div className="cate_title">
        <Button type="primary" onClick={showModal} className="btn">
          添加随笔
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
        className='modal-essay'
        title={<div style={{ textAlign: 'left' }}>添加随笔</div>}
        okText="添加"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="content"
            // label="随笔"
            rules={[{ required: true, message: '随笔不能为空' }]}
          >
            <Editor
              preview={false}
              subfield={false}
              placeholder="请撰写文章"
              ref={editorRef}
              addImg={file => addImg(file)}
            />
          </Form.Item>
          <Form.Item
            name="cover"
            // label="随笔图片"
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
        className='modal-essay'
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item
            name="content"
            // label="随笔"
            rules={[{ required: true, message: '随笔不能为空' }]}
          >
            <Editor
              preview={false}
              subfield={false}
              placeholder="请撰写文章"
              ref={editorRef}
              addImg={file => addImg(file)}
            />
          </Form.Item>
          <Form.Item
            name="cover"
            // label="文章封面"
          >
            {/* @ts-ignore */}
            <UploadImage imgUrlArr={imgUrl} handleChange={handleChange} handleRemove={handleRemove} />
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
export default connect(null, mapDispatchToProps)(Essay);
