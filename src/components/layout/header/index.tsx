import { Layout, Dropdown, message } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import './index.less';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
const { Header } = Layout;
const TopHeader = (props: any) => {
  // 用户信息
  const [username, setUserName] = useState();
  useEffect(() => {
    // 解析token
    //@ts-ignore
    let username = jwtDecode(localStorage.getItem('token'))[0].username;
    setUserName(username);
  }, []);
  const changeCollapsed = () => {
    // 改变状态值
    props.ChangeCollapsed.changeCollapsed();
  };
  // 退出登录
  const handQuitLogin = () => {
    props.BlogActions.asyncLoginOutAction().then(() => {
      // 清空token
      localStorage.removeItem('token');
      message.success('退出登录');
      // 跳转到登录页面
      props.history.push('/admin/login');
    });
  };
  // 跳转到用户管理
  const handleJumpUser = () => {
    props.history.push('/admin/user/list')
  };
  const items: MenuProps['items'] = [
    {
      label: (
        <div>
          <div onClick={handleJumpUser}>用户管理</div>
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <div>
          <div onClick={handQuitLogin}>退出登录</div>
        </div>
      ),
      key: '2',
      danger: true,
    },
  ];
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px', userSelect: 'none', position: 'relative' }}>
      {/* 获取状态 */}
      {props.isCollapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed} />
      )}
      <div className='avatar'>
          <Dropdown menu={{ items }} placement="bottom">
          <div className='avatar_text'>
            {username === "guest" ? "访客登录" : <span>「{username}」</span>}
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
// 将dispatch方法映射为props
const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
    // 封装一个dispatch 函数
    ChangeCollapsed: bindActionCreators(BlogActions, dispatch),
  };
};
// 将状态映射为属性
const mapStateToProps = (state: any) => {
  return {
    userinfo: state.LoginReducer.userinfo,
    isCollapsed: state.SideMenuStateReducer.isCollapsed,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader));
