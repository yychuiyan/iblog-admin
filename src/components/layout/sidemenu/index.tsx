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
  UserOutlined
} from '@ant-design/icons';
import './index.less';
import { useEffect, useState } from 'react';
interface DataType {
  rightsid: any;
  key: React.Key;
  _id: string;
  index: number;
  title: string;
  pagepermission: number;
  grade: number;
  createtime: number;
  updatetime: number;
  children: DataType[] | string;
}
interface RightsData {
  data: DataType[];
}
const { Sider } = Layout;
// const items = [
//   {
//     key: '/admin/home',
//     icon: <HomeOutlined />,
//     label: '首页',
//   },
//   {
//     key: '/admin/article',
//     icon: <HighlightOutlined />,
//     label: '文章管理',
//     children: [
//       {
//         key: '/admin/article/list',
//         label: '文章列表',
//       },
//       {
//         key: '/admin/article/insert',
//         label: '编写文章',
//       },
//       {
//         key: '/admin/article/comment',
//         label: '评论管理',
//       },
//       {
//         key: '/admin/article/category',
//         label: '文章分类',
//       },
//       {
//         key: '/admin/article/tags',
//         label: '标签信息',
//       },
//     ],
//   },
//   {
//     key: '/admin/permission',
//     icon: <HighlightOutlined />,
//     label: '权限管理',
//     children: [
//       {
//         key: '/admin/permission/list',
//         label: '权限列表',
//       },
//       {
//         key: '/admin/rule/list',
//         label: '角色管理',
//       }
//     ],
//   },

//   {
//     key: '/admin/userinfo',
//     icon: <UserOutlined />,
//     label: '用户管理',
//   },
//   {
//     key: '/admin/message',
//     icon: <MessageOutlined />,
//     label: '留言管理',
//   },
//   {
//     key: '/admin/friendly',
//     icon: <LinkedinOutlined />,
//     label: '友链管理',
//   },
//   {
//     key: '/admin/essay',
//     icon: <EditOutlined />,
//     label: '随笔',
//   },
//   {
//     key: '/admin/about',
//     icon: <NotificationOutlined />,
//     label: '关于管理',
//   },
// ];
// icon
const iconList = {
  '/admin/home': <HomeOutlined />,
}

const SideMenu = (props: any) => {
  // 路由列表
  const [items, setItems] = useState<DataType[]>([])
  // 获取权限列表
  useEffect(() => {
    props.BlogActions.asyncRightsListAction().then((res: any) => {
      // 获取权限
      let { data } = res.data;
      // 根据pagepermission字段将页面需要的权限展示
      data.map((item: any, index: number) => {
        if (item.children < 1) {
          return data[index].children = ""
        } else {
          const newItem = item.children.filter((it: any) => it.pagepermission === 1)
          return item.children = newItem
        }
      })

      console.log("data", data);

      setItems(data);
    });
  }, [props.BlogActions]);

  // 获取动态路由信息
  const selectKeys = [props.location.pathname];

  // 截取路由信息，折叠页面自动打开
  const openKeys = ['/admin/' + props.location.pathname.split('/')[2]];

  // 获取路由列表
  // 点击切换路由
  const handleItemClick = (e: { keyPath: any[]; }) => {
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
