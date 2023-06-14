import { Button, Table, Modal, message, Form, Input, Tree } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import type { ColumnsType } from 'antd/es/table';
import MyPagination from '@/components/pagination';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
const { confirm } = Modal;
interface DataType {
  _id: string;
  role_type: number;
  role_name: string;
  rights: string[];
  create_time: string;
  update_time: string;
  rightsId: any;
  key: React.Key;
  index: number;
  label: string;
  title?: string;
  pagepermission: number | boolean;
  grade: number;
  children?: DataType[] | string;
}
interface RoleData {
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}

interface RightsData {
  pagepermission: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const RoleList = (props: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '角色名称',
      dataIndex: 'role_name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: time => {
        return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      render: time => {
        return time === 0 ? time : dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
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
                roleDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.pagepermission === 2}
              onClick={() => {
                roleUpdate(item);
                setCurrentRights(item.rights)
              }}
              style={{ marginRight: '5px' }}
            />
          </div>
        );
      },
    },
  ];
  // 初始值
  const [dataSource, setDataSource] = useState<DataType[]>([])
  // 权限数据
  const [rightsData, setRightsData] = useState<any>([])
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 更新窗口
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  // 更新表单
  const [updateForm] = Form.useForm();
  // 保存当前更新的数据
  const [updateData, setUpdateData] = useState<any>({});
  // 当前项的数组数据
  const [currentRights, setCurrentRights] = useState([])
  // 获取角色列表
  useEffect(() => {
    props.BlogActions.asyncRoleListAction(currentPage, pageSize, '').then((res: RoleData) => {
      // 获取角色
      let { data, totalCount, page, pageSize } = res.data as unknown as RoleData;
      setDataSource(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 获取权限列表
  useEffect(() => {
    props.BlogActions.asyncRightsListAction('', '', '').then((res: RightsData) => {
      // 获取权限
      let { data } = res.data as unknown as RightsData;
      data.map((item: any, index: number) => item.children.length < 1 ? data[index].children = "" : data)
      let newData = data.map((item: any) => {
        return {
          'title': item.label,
          'key': item.key,
          'children': item.children ? item.children.map((child: any) => {
            return {
              'title': child.label,
              'key': child.key,
              'children': []
            }
          }) : []
        }
      })
      setRightsData(newData);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 分页效果
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncRightsListAction(page, pageSize, params).then((res: RoleData) => {
      // 获取列表数据
      let { data } = res.data as unknown as RoleData;
      setDataSource(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };
  // 点击更新
  const roleUpdate = (item: RoleData) => {
    setIsModalUpdateOpen(true);
    updateForm.setFieldsValue(item);
    setUpdateData(item);
  };
  // 更新操作
  const handleUpdateConfirm = () => {
    let value = updateForm.getFieldsValue();
    setDataSource(dataSource.map((item: any) => {
      if (item._id === updateData._id) {
        return {
          ...item,
          rights: currentRights
        }
      }
      return item;
    }))
    props.BlogActions.asyncRoleUpdateAction({
      role_name: value.role_name,
      rights: currentRights,
      //@ts-ignore
      id: updateData._id,
    }).then(() => {
      message.success('更新成功');
      props.BlogActions.asyncRoleListAction(currentPage, pageSize, '').then((res: RoleData) => {
        // 获取角色
        let { data, totalCount, page, pageSize } = res.data as unknown as RoleData;

        setDataSource(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      });
      setIsModalUpdateOpen(false);
    });


  };
  // 删除
  const roleDelete = (item: DataType) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // 先将要删除的数据过滤掉再调用接口
        setDataSource(dataSource.filter((it) => it._id !== item._id));
        message.success('角色删除成功');
        props.BlogActions.asyncRoleDeleteAction(item._id).then(() => {
          props.BlogActions.asyncRoleListAction(currentPage, pageSize, '').then((res: RoleData) => {
            // 获取角色
            let { data, totalCount, page, pageSize } = res.data as unknown as RoleData;
            setDataSource(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          });
        });
      }
    });
  }
  // 关闭窗口
  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
  };
  // 监听选中
  const onCheck = (checkKeys: any) => {
    setCurrentRights(checkKeys.checked)
  }
  return (
    <div>
      <Modal
        open={isModalUpdateOpen}
        title={<div style={{ textAlign: 'left' }}>权限分配</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="role_name" label="角色名称" rules={[{ required: true, message: '角色名称不能为空' }]}>
            <Input />
          </Form.Item>
        </Form>
        <Tree
          checkable
          checkedKeys={currentRights}
          checkStrictly={true}
          onCheck={onCheck}
          treeData={rightsData}
        />
      </Modal>
      <Table
        columns={columns}
        expandRowByClick={true}
        dataSource={dataSource}
        rowKey={(item) => {
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
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(RoleList);
