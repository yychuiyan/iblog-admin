import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { useLocation, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {
  HomeOutlined,
  HighlightOutlined,
  MessageOutlined,
  EditOutlined,
  LinkedinOutlined,
  NotificationOutlined,
  UserOutlined,
  RocketOutlined,
  HeartOutlined,
  VerifiedOutlined,
  ContactsOutlined,
  SketchOutlined
} from '@ant-design/icons';
import './index.less';
import { useEffect, useState } from 'react';
interface DataType {
  label: any;
  // label: string;
  icon: string;
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
const { Sider } = Layout;
const SideMenu = (props: any) => {
  const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
  const { role } = token[0]
  // 路由列表
  const [items, setItems] = useState<DataType[]>([])
  const location = useLocation()
  // 默认展开路由
  // const [openKeys, setOpenKeys] = useState<any[]>()
  // 获取权限列表
  useEffect(() => {
    props.BlogActions.asyncRightsListAction().then((res: any) => {
      // 获取权限
      let { data } = res.data;
      // 根据pagepermission字段将页面需要的权限展示
      data.map((item: any, index: number) => {
        if (item.children.length < 1) {
          return data[index].children = ""
        } else {
          const itemChildren = item.children.filter((it: any) => it.pagepermission === 1)
          return item.children = itemChildren
        }
      })
      let dataFilter = data.filter((data: DataType) => data.pagepermission === 1 && role[0].rights.includes(data.key))
      setItems(dataFilter);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.BlogActions]);
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'HomeOutlined':
        return <HomeOutlined />;
      case 'HighlightOutlined':
        return <HighlightOutlined />;
      case 'VerifiedOutlined':
        return <VerifiedOutlined />;
      case 'UserOutlined':
        return <UserOutlined />;
      case 'MessageOutlined':
        return <MessageOutlined />;
      case 'LinkedinOutlined':
        return <LinkedinOutlined />;
      case 'EditOutlined':
        return <EditOutlined />;
      case 'NotificationOutlined':
        return <NotificationOutlined />;
      case 'RocketOutlined':
        return <RocketOutlined />;
      case 'HeartOutlined':
        return <HeartOutlined />
      case 'ContactsOutlined':
        return <ContactsOutlined />
      case 'SketchOutlined':
        return <SketchOutlined />
      default:
        return null;
    }
  };
  // 获取动态路由信息
  const selectKeys = [props.location.pathname];

  // 截取路由信息，折叠页面自动打开
  const pathname = location.pathname;
  const openKeys = ['/admin/' + pathname.split('/')[2]];
  // 获取路由列表
  // 点击切换路由
  const handleItemClick = (e: { keyPath: any[]; }) => {
    let path = e.keyPath[0];
    props.history.push(path);
  };
  return (
    // 折叠展开
    <Sider trigger={null} collapsible collapsed={props.isCollapsed} style={{ userSelect: 'none' }}>
      <div className="logo">
        {props.isCollapsed ? (
          <div className="logo_text_hide">
            <img
              src="https://cos.yychuiyan.com/iblogs/avatar1530.webp"
              alt=""
              style={{ borderRadius: '50%', height: '35px', width: '35px', marginTop: '8px' }}
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              left: '25px',
            }}
          >
            <img
              src="https://cos.yychuiyan.com/iblogs/avatar1530.webp"
              alt=""
              style={{ borderRadius: '50%' }}
            />
            <div className="logo_text">夜雨炊烟</div>
          </div>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        className="sidemeun"
        defaultSelectedKeys={['/admin/home']}
        selectedKeys={selectKeys}
        onClick={handleItemClick}
        defaultOpenKeys={openKeys}
        items={items.map((item: DataType) => ({
          ...item,
          icon: renderIcon(item.icon),
        }))}
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
