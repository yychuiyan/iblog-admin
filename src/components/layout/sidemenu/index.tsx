import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { withRouter } from 'react-router-dom';
import {
  HomeOutlined,
  HighlightOutlined,
  MessageOutlined,
  EditOutlined,
  LinkedinOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './index.less';

const { Sider } = Layout;
const items = [
  {
    key: '/admin/home',
    icon: <HomeOutlined />,
    label: '首页测试',
  },
  {
    key: '/admin/article',
    icon: <HighlightOutlined />,
    label: '文章管理',
    children: [
      {
        key: '/admin/article/list',
        label: '文章列表',
      },
      {
        key: '/admin/article/insert',
        label: '编写文章',
      },
      {
        key: '/admin/article/comment',
        label: '评论管理',
      },
      {
        key: '/admin/article/category',
        label: '文章分类',
      },
      {
        key: '/admin/article/tags',
        label: '标签信息',
      },
    ],
  },
  // {
  //   key: '/admin/userinfo',
  //   icon: <UserOutlined />,
  //   label: '用户管理',
  // },
  {
    key: '/admin/message',
    icon: <MessageOutlined />,
    label: '留言管理',
  },
  {
    key: '/admin/friendly',
    icon: <LinkedinOutlined />,
    label: '友链管理',
  },
  {
    key: '/admin/essay',
    icon: <EditOutlined />,
    label: '随笔',
  },
  {
    key: '/admin/about',
    icon: <NotificationOutlined />,
    label: '关于管理',
  },
];

const SideMenu = (props: any) => {
  // 获取动态路由信息
  const selectKeys = [props.location.pathname];

  // 截取路由信息，折叠页面自动打开
  const openKeys = ['/admin/' + props.location.pathname.split('/')[2]];

  // 获取路由列表
  // 点击切换路由
  const handleItemClick = (e: any) => {
    let path = e.keyPath[0];
    props.history.push(path);
  };
  return (
    // 折叠展开
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div className="logo">
        {/* <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" /> */}
        <div className="logo_text">夜雨炊烟</div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/admin/home']}
        selectedKeys={selectKeys}
        onClick={handleItemClick}
        defaultOpenKeys={openKeys}
        items={items}
      ></Menu>
    </Sider>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
const mapStateToProps = (state: any) => {
  return {
    userinfo: state.LoginReducer.userinfo,
    isCollapsed: state.SideMenuStateReducer.isCollapsed,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));
