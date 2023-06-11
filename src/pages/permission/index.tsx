import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
interface DataType {
  key: React.Key;
  _id: string;
  title: string;
  pagepermission: number;
  grade: number;
  createTime: string;
  updateTime: string;
}
interface RightsData {

  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const PermissionList = (props: any) => {
  // 初始值
  const [dataSource, setDataSource] = useState<DataType[]>([])
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 获取权限列表
  useEffect(() => {
    props.BlogActions.asyncRightsListAction(currentPage, pageSize, '').then((res: RightsData) => {
      // 获取随笔
      let { data, totalCount, page, pageSize } = res.data as unknown as RightsData;
      console.log("data", data);

      setDataSource(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  const columns: ColumnsType<DataType> = [
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: 'key',
      dataIndex: 'key',
    },
    {
      title: '权限等级',
      dataIndex: 'pagepermission',
      key: 'pagepermission',
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => {
        return (
          <div>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                // EssayDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                // EssayUpdate(item);
              }}
              style={{ marginRight: '5px' }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => {
          return item._id + Date.now();
        }}
        pagination={false}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(PermissionList);
