import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Image,
  Input,
  message,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import jwtDecode from 'jwt-decode';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  CloudUploadOutlined,
  EditOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import dayjs from 'dayjs';
import { statusPublish } from '@/utils/constants';
import './index.less'
import { handleNotDelete, onNotChangeStatus, onNotChangePublishLineStatus, onNotChangePublishStatus } from '@/utils/prompt';
const { confirm } = Modal;
const { Search } = Input;
interface DataType {
  isTop: boolean | undefined;
  introduction?: string;
  title?: string;
  cover: string | undefined;
  key: React.Key;
  _id: string;
  username?: string;
  avatar?: string;
  articleIds?: string[];
  tags: string[];
  views?: number;
  comment?: number;
  like?: number;
  collect?: number;
  publishStatus: number;
  createTime: string;
  updateTime: string;
}
interface ArticleData {
  msg: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const ArticleList = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '文章标题',
      dataIndex: 'title',
      render: (_, record) => {
        return <p className='introduction' style={{ width: '9rem' }}>{record.title}</p>;
      },
    },
    {
      title: '封面',
      dataIndex: 'cover',
      render: (_, record) => {
        return <Image width={50} height={50} src={record.cover}></Image>;
      },
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      render: (_, record) => {
        return <p className='introduction' style={{ width: '20rem' }}>{record.introduction}</p>;
      },
    },
    {
      title: '分类',
      dataIndex: 'categories',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record) => {
        let result = [];
        for (let i = 0; i < record.tags.length; i += 3) {
          result.push(record.tags.slice(i, i + 3)); // i=0 0-3 i=3 3-6
        }
        return result.map((item, index) => {
          return (
            <div style={{ marginBottom: 10 }} key={index}>
              {item.map((sub) => (
                <Tag style={{ marginRight: 10 }} key={sub}>
                  {sub}
                </Tag>
              ))}
            </div>
          );
        });
      },
    },
    {
      title: '访问量',
      dataIndex: 'views',
      align: 'center',
      render: (_, record) => {
        return <p style={{ width: '5rem' }}>{record.views}</p>;
      },
    },
    {
      title: '评论',
      dataIndex: 'comment',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return <p style={{ width: '5rem' }}>{record.comment}</p>;
      },
    },
    {
      title: '置顶',
      dataIndex: 'isTop',
      render: (_, record) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.isTop}
            onChange={checked => role_type ? onNotChangeStatus() : onChangeStatus(checked, record)}
          />
        );
      },
    },
    {
      title: '发布状态',
      dataIndex: 'publishStatus',
      render: (_, record) => {
        const published: any = {
          1: '已发布',
          2: '未发布',
        };
        const enums: any = {
          1: 'success',
          2: 'error',
        };
        return (
          <Space direction="vertical" style={{ width: '5rem' }}>
            <Badge status={enums[record.publishStatus]} text={published[record.publishStatus]} />
          </Space>
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
      title: '修改时间',
      dataIndex: 'updateTime',
      render: time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => {
        return (
          <div>
            <Button
              type="primary"
              ghost
              shape="circle"
              onClick={() => {
                onChangePublishStatus(record);
              }}
              style={{ marginRight: '5px' }}
            >
              {record.publishStatus === 1 ? <CloudDownloadOutlined /> : <CloudUploadOutlined />}
            </Button>
            {record.publishStatus === 2 && (
              <>
                <Button
                  type="primary"
                  ghost
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    props.history.push(`/admin/article/update/${record._id}`);
                  }}
                  style={{ marginRight: '5px' }}
                />
                <Button
                  type="primary"
                  danger
                  ghost
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    articleDelete(record);
                  }}
                  style={{ marginRight: '5px' }}
                />
              </>
            )}
          </div>
        );
      },
    },
  ];
  // 文章列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 获取文章列表数据
  useEffect(() => {
    props.BlogActions.asyncArticleListAction(currentPage, pageSize, '', 0, 0).then((res: ArticleData) => {
      // 获取文章
      let { data, totalCount, page, pageSize } = res.data as unknown as ArticleData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);

  // 新增文章
  const handleArticleAdd = () => {
    props.history.push(`/admin/article/insert`);
  };
  // 发布
  const onChangePublishStatus = (record: DataType) => {
    if (record.publishStatus === 2) {
      record.publishStatus = 1;
      if (role_type) {
        return onNotChangePublishLineStatus();
      }
      // 修改发布状态
      props.BlogActions.asyncArticlePublishStatusUpdateAction({
        publishStatus: record.publishStatus,
        id: record._id,
      }).then(() => {
        message.success('文章发布成功');
      });
    } else {
      if (role_type) {
        return onNotChangePublishStatus();
      }
      record.publishStatus = 2;
      props.BlogActions.asyncArticlePublishStatusUpdateAction({
        publishStatus: record.publishStatus,
        id: record._id,
      }).then(() => {
        message.success('文章下线成功');
      });
    }
  };

  // 更新文章置顶状态
  const onChangeStatus = (checked: boolean, row: DataType) => {
    row.isTop = checked
    setList([...list]);
    props.BlogActions.asyncArticleTopStatusUpdateAction({
      isTop: checked,
      id: row._id,
    }).then((res: ArticleData) => {
      message.success(res.msg)
    });
  };
  // 删除文章
  const articleDelete = (item: DataType) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it) => it._id !== item._id));
        message.success('文章删除成功');
        props.BlogActions.asyncArticleDeleteAction(item._id).then(() => {
          props.BlogActions.asyncArticleListAction(currentPage, pageSize, '', 0, 0).then(
            (res: ArticleData) => {
              // 获取文章
              let { data, totalCount, page, pageSize } = res.data as unknown as ArticleData;
              setList(data);
              setTotal(totalCount);
              setCurrentPage(page);
              setPageSize(pageSize);
            }
          );
        });
      },
    });
  };
  // 搜索
  const onSearch = (value: string) => {
    props.BlogActions.asyncArticleListAction(currentPage, pageSize, value, 0, 0).then(
      (res: ArticleData) => {
        let { data, totalCount, page, pageSize } = res.data as unknown as ArticleData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      }
    );
  };
  // 发布状态搜索
  const handleChange = (publishStatus: number) => {
    props.BlogActions.asyncArticleListAction(currentPage, pageSize, '', 0, publishStatus).then(
      (res: ArticleData) => {
        let { data, totalCount, page, pageSize } = res.data as unknown as ArticleData;
        setList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      }
    );
  };
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number) => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncArticleListAction(page, pageSize, '', '', '').then((res: ArticleData) => {
      // 获取列表数据
      let { data } = res.data as unknown as ArticleData;
      setList(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };
  return (
    <div>
      <div className="article_title">
        <div>
          <Button type="primary" onClick={handleArticleAdd} className="btn">
            添加文章
          </Button>
        </div>
        <div>
          <span>发布状态：</span>
          <Select
            defaultValue={0}
            style={{ width: 120 }}
            onChange={handleChange}
            options={statusPublish}
          ></Select>
          <Search
            className="search"
            allowClear
            placeholder="请输入文章名称"
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
      <div className='table'>
      <Table
        columns={columns}
        dataSource={list}

        rowKey={(item) => {
          return item._id + Date.now();
        }}
        pagination={false}
      />
      </div>
      <div>
      <MyPagination
        pageSize={pageSize}
        currentPage={currentPage}
        total={total}
        onChange={onChangePage}
      ></MyPagination>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(ArticleList);
