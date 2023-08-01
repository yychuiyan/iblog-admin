import { Button, Table, Tag, Modal, message, Form, Input, Switch } from 'antd'
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
  rightsId: any;
  key: React.Key;
  _id: string;
  index: number;
  label: string;
  pagepermission: number | boolean;
  grade: number;
  create_time: string;
  update_time: string;
  children?: DataType[] | string;
}
interface RightsData {
  pagepermission: boolean;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const PermissionList = (props: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '权限名称',
      dataIndex: 'label',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key: string) => {
        return <Tag color='orange'>{key}</Tag>
      }
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
                rightsDelete(item);
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
                rightsUpdate(item);
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
  // 权限状态
  const [permissionStatus, setPermissionStatus] = useState<Boolean>()
  // 获取权限列表
  useEffect(() => {
    props.BlogActions.asyncRightsListAction(currentPage, pageSize, '').then((res: RightsData) => {
      // 获取权限
      let { data, totalCount, page, pageSize } = res.data as unknown as RightsData;
      data.map((item: any, index: number) => item.children.length < 1 ? data[index].children = "" : data)
      setDataSource(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 分页效果
  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncRightsListAction(page, pageSize, params).then((res: RightsData) => {
      // 获取列表数据
      let { data } = res.data as unknown as RightsData;
      setDataSource(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };

  // 点击更新
  const rightsUpdate = (item: RightsData) => {
    setIsModalUpdateOpen(true);
    updateForm.setFieldsValue(item);
    setPermissionStatus(Boolean(item.pagepermission))
    setUpdateData(item);
  };
  // 更新操作
  const handleUpdateConfirm = () => {
    let value = updateForm.getFieldsValue();
    if (updateData.grade === 1) {
      props.BlogActions.asyncRightsUpdateAction({
        label: value.label,
        pagepermission: Number(value.pagepermission),
        //@ts-ignore
        id: updateData._id,
      }).then(() => {
        message.success('更新成功');
        props.BlogActions.asyncRightsListAction(currentPage, pageSize, '').then((res: RightsData) => {
          // 获取权限
          let { data, totalCount, page, pageSize } = res.data as unknown as RightsData;
          data.map((item: any, index: number) => item.children.length < 1 ? data[index].children = "" : data)
          setDataSource(data);
          setTotal(totalCount);
          setCurrentPage(page);
          setPageSize(pageSize);
        });
        updateForm.resetFields();
        setIsModalUpdateOpen(false);
      });
    } else {
      props.BlogActions.asyncRightsChildrenUpdateAction({
        label: value.label,
        pagepermission: Number(value.pagepermission),
        //@ts-ignore
        id: updateData._id,
      }).then(() => {
        message.success('菜单子权限更新成功');
        props.BlogActions.asyncRightsListAction(currentPage, pageSize, '').then((res: RightsData) => {
          // 获取权限
          let { data, totalCount, page, pageSize } = res.data as unknown as RightsData;
          data.map((item: any, index: number) => item.children.length < 1 ? data[index].children = "" : data)
          setDataSource(data);
          setTotal(totalCount);
          setCurrentPage(page);
          setPageSize(pageSize);
        });
        updateForm.resetFields();
        setIsModalUpdateOpen(false);
      });
    }

  };
  // 删除
  const rightsDelete = (item: DataType) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // 根据层级判断进行删除
        if (item.grade === 1) {
          // 先将要删除的数据过滤掉再调用接口
          setDataSource(dataSource.filter((it) => it._id !== item._id));
          message.success('权限删除成功');
          props.BlogActions.asyncRightsDeleteAction(item._id).then(() => {
            props.BlogActions.asyncRightsListAction(currentPage, pageSize, '').then((res: RightsData) => {
              // 获取权限
              let { data, totalCount, page, pageSize } = res.data as unknown as RightsData;
              data.map((item: any, index: number) => item.children.length < 1 ? data[index].children = "" : data)
              setDataSource(data);
              setTotal(totalCount);
              setCurrentPage(page);
              setPageSize(pageSize);
            });
          });
        } else {
          // 根据子id查找到父id
          let list = dataSource.filter((data: any) => data._id === item.rightsId);
          // 将children字段进行重新替换
          //@ts-ignore
          list[0].children = list[0].children.filter((data: any) => data._id !== item._id)
          setDataSource([...dataSource])
          message.success('子菜单删除成功')
          props.BlogActions.asyncRightsChildrenDeleteAction(item._id).then(() => {
            props.BlogActions.asyncRightsListAction(currentPage, pageSize, '').then((res: RightsData) => {
              // 获取权限
              let { data, totalCount, page, pageSize } = res.data as unknown as RightsData;
              data.map((item: any, index: number) => item.children.length < 1 ? data[index].children = "" : data)
              setDataSource(data);
              setTotal(totalCount);
              setCurrentPage(page);
              setPageSize(pageSize);
            });
          });
        }
      },
    });
  }
  // 关闭窗口
  const handleUpdateCancel = () => {
    updateForm.resetFields();
    setIsModalUpdateOpen(false);
  };
  const handleChangeStatus = () => {
    setPermissionStatus(!permissionStatus)
  }
  return (
    <div>
      <Modal
        open={isModalUpdateOpen}
        title={<div style={{ textAlign: 'left' }}>更新权限</div>}
        okText="更新"
        cancelText="取消"
        onCancel={handleUpdateCancel}
        onOk={() => {
          handleUpdateConfirm();
        }}
      >
        <Form form={updateForm} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="label" label="权限名称" rules={[{ required: true, message: '权限名称不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pagepermission" label="权限状态" rules={[{ required: true, message: '权限状态不能为空' }]}>
            {/* @ts-ignore */}
            <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={permissionStatus} onChange={handleChangeStatus} />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        expandRowByClick={true}
        scroll={{ y: 'calc(100vh - 210px)', x: true }}
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
export default connect(null, mapDispatchToProps)(PermissionList);
