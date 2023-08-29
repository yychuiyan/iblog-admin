import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, message, Modal, Radio, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, AuditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { auditStatusOptions } from '@/utils/constants';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { handleNotAudit, handleNotDelete, handleNotAllAudit } from '@/utils/prompt';
const { confirm } = Modal;
interface DataType {
  targetReplayContent: string;
  currentReplayContent: string;
  key?: React.Key;
  _id: string;
  nickName?: string;
  avatar?: string;
  messageTime: string;
  auditTime: string;
  children?: DataType[] | string | undefined;
}
interface MessageData {
  _id: string;
  totalCount: number;
  page: number;
  pageSize: number;
  data: DataType[];
}
const Message = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const role_type = token[0].role[0].role_type
  const columns: ColumnsType<DataType> = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 150,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 100,
    },
    {
      title: '当前回复内容',
      dataIndex: 'currentReplayContent',
      render: (_, record) => {
        return <p className='introduction' style={{ width: '9rem' }}>{record.currentReplayContent}</p>;
      },
    },
    {
      title: '目标回复内容',
      width: 120,
      dataIndex: 'targetReplayContent',
      render: (_, record) => {
        return <p className='introduction' style={{ width: '9rem' }}>{record.targetReplayContent}</p>;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      width: 100,
      render: status => {
        const current = auditStatusOptions.filter(item => item.value === +status);
        const enums: any = {
          1: 'success',
          2: 'error',
          3: 'warning',
        };
        return (
          <Space direction="vertical">
            <Badge status={enums[current[0].value]} text={current[0].label} />
          </Space>
        );
      },
    },

    {
      title: '留言时间',
      dataIndex: 'messageTime',
      render: time => {
        return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      width: 100,
      render: time => {
        return time && dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss');
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
                messageDelete(item);
              }}
              style={{ marginRight: '5px' }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<AuditOutlined />}
              onClick={() => {
                messageAudit(item);
              }}
              style={{ marginRight: '5px' }}
            ></Button>
          </div>
        );
      },
    },
  ];

  // 留言列表
  const [list, setList] = useState<DataType[]>([]);
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(15);
  // 窗口
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 表单数据
  const [form] = Form.useForm();
  // 将id值存放
  const [id, setId] = useState();
  // 点击审核时获取到的数据列表
  const [auditContent, setAuditContent] = useState<any>();
  // 获取留言列表数据
  useEffect(() => {
    props.BlogActions.asyncMessageListAction(currentPage, pageSize, 0).then((res: MessageData) => {
      // 获取留言
      let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
      // 无子节点情况下，按钮
      data.forEach((item: any) => {
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

  // 删除留言
  const messageDelete = (item: { _id: string; }) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (role_type) {
          return handleNotDelete();
        }
        // 先将要删除的数据过滤掉再调用接口
        setList(list.filter((it) => it._id !== item._id));
        message.success('留言删除成功');
        props.BlogActions.asyncMessageDeleteAction(item._id).then(() => {
          props.BlogActions.asyncMessageListAction(currentPage, pageSize, 0).then((res: MessageData) => {
            // 获取留言
            let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
            setList(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          });
        });
      },
    });
  };
  // 审核
  const messageAudit = (item: { _id: any; auditStatus?: any; }) => {
    setTimeout(() => {
      form.setFieldsValue({
        auditStatus: +item.auditStatus,
      });
    }, 100);
    setAuditContent(item);
    setId(item._id);
    setIsModalOpen(true);
  };
  const status: any = {
    1: '通过',
    2: '驳回',
  };
  // 点击确定
  const handleConfirm = async () => {
    if (role_type) {
      return handleNotAudit();
    }
    await form.validateFields();
    const val = form.getFieldsValue();

    // 一键审核
    if (id === 0) {
      props.BlogActions.asyncMessageStatusUpdateAction({
        auditStatus: val.auditStatus,
        id: id,
      }).then(() => {
        props.BlogActions.asyncMessageListAction(currentPage, pageSize, 0).then((res: MessageData) => {
          // 获取留言
          let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
          setList(data);
          setTotal(totalCount);
          setCurrentPage(page);
          setPageSize(pageSize);
        });
        message.success(`一键审核${status[val.auditStatus]}成功`);
        form.resetFields();
        setIsModalOpen(false);
      });
    } else {
      if (auditContent.children) {
        auditContent?.children.map((audit: MessageData) =>
          props.BlogActions.asyncMessageStatusUpdateAction({
            auditStatus: val.auditStatus,
            id: audit._id,
          })
        );
        //父节点数据
        props.BlogActions.asyncMessageStatusUpdateAction({
          auditStatus: val.auditStatus,
          id: id,
        }).then(() => {
          props.BlogActions.asyncMessageListAction(currentPage, pageSize, 0).then((res: MessageData) => {
            // 获取留言
            let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
            setList(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          });
          message.success(`审核${status[val.auditStatus]}成功`);
          form.resetFields();
          setIsModalOpen(false);
        });
      } else {
        //父节点数据
        props.BlogActions.asyncMessageStatusUpdateAction({
          auditStatus: val.auditStatus,
          id: id,
        }).then(() => {
          props.BlogActions.asyncMessageListAction(currentPage, pageSize, 0).then((res: MessageData) => {
            // 获取留言
            let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
            setList(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          });
          message.success(`审核${status[val.auditStatus]}成功`);
          form.resetFields();
          setIsModalOpen(false);
        });
      }
    }
  };
  // 关闭窗口
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // 跳转页数据显示
  const onChangePage = (page: number, pageSize: number, params = '') => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncCommentsAction(page, pageSize, params).then((res: MessageData) => {
      // 获取列表数据
      let { data } = res.data as unknown as MessageData;
      setList(data);
      // 切换行
      setCurrentPage(page);
      // 根据页面数据显示页码
      setPageSize(pageSize);
    });
  };
  return (
    <div>
      <div className="title">
        <Button type="primary" onClick={() => role_type ? handleNotAllAudit() : messageAudit({ _id: 0 })}>
          一键审核
        </Button>
        {/* <div className="cate_search">
          <Select defaultValue={0} style={{ width: 120 }} options={auditStatusOptions}></Select>
          <Search className="search" allowClear placeholder="请输入留言名称" enterButton />
        </div> */}
      </div>
      <Modal
        open={isModalOpen}
        title={<div style={{ textAlign: 'left' }}>添加审核</div>}
        okText="新增"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          handleConfirm();
        }}
      >
        <Form form={form} layout="vertical" name="basic" className="userAddFrom">
          <Form.Item name="auditStatus" rules={[{ required: true, message: '请选择审核状态' }]}>
            <Radio.Group>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>驳回</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        rowKey={(item) => {
          return item._id;
        }}
        columns={columns}
        dataSource={list}
        scroll={{ y: 'calc(100vh - 240px)', x: true }}
        expandRowByClick={true}
        defaultExpandAllRows={true}
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
export default connect(null, mapDispatchToProps)(Message);
