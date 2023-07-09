import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { handleNotDelete } from '@/utils/prompt';
import './index.less';
const { confirm } = Modal;
const { Search } = Input;

interface DataType {
  children: DataType[] | string;
  key?: React.Key;
  _id: string;
  username?: string;
  avatar?: string;
  articleIds?: string[];
  createTime: string;
  updateTime: string;
}
interface CommentData {
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const Comments = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      fixed: 'left',
      width: 160,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '当前回复内容',
      dataIndex: 'currentReplayContent',
    },
    {
      title: '目标回复ID',
      dataIndex: 'targetReplayId',
    },
    {
      title: '目标回复内容',
      dataIndex: 'targetReplayContent',
    },

    {
      title: '评论时间',
      dataIndex: 'commentTime',
      render: time => {
        return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: item => {
        return (
          <div>
            <Button
              type="primary"
              danger
              shape="circle"
              // disabled={role_type}
              icon={<DeleteOutlined />}
              onClick={() => {
                commentDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
          </div>
        );
      },
    },
  ];

  // 评论列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(5);
  // 获取评论列表数据
  useEffect(() => {
    props.BlogActions.asyncCommentsAction(currentPage, pageSize, '').then((res: CommentData) => {
      // 获取评论
      const { data, totalCount, page, pageSize } = res.data as unknown as CommentData;
      // 无子节点情况下，按钮
      data.forEach((item) => {
        if (item.children.length === 0) {
          item.children = '';
        }
      });
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 删除评论
  const commentDelete = (item: DataType) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it: { _id: string }) => it._id !== item._id));
        message.success('评论删除成功');
        props.BlogActions.asyncCommentDeleteAction(item._id).then(() => {
          props.BlogActions.asyncCommentsAction(currentPage, pageSize, '').then((res: CommentData) => {
            // 获取评论
            const { data, totalCount, page, pageSize } = res.data as unknown as CommentData;
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
  const onSearch = (articleTitle: string) => {
    props.BlogActions.asyncCommentsAction(currentPage, pageSize, articleTitle).then((res: CommentData) => {
      const { data, totalCount, page, pageSize } = res.data as unknown as CommentData;
      setList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };

  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncCommentsAction(page, pageSize, params).then((res: CommentData) => {
      // 获取列表数据
      let { data } = res.data as unknown as CommentData;
      setList(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };
  return (
    <div>
      <div className="cate_title">
        <div></div>
        <div className="cate_search">
          <Search
            className="search"
            allowClear
            placeholder="请输入文章名称"
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={(item: DataType) => {
          return item._id;
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
export default connect(null, mapDispatchToProps)(Comments);
