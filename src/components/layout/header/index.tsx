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
  const [userInfo, setUserInfo] = useState<any>({});
  useEffect(() => {
    // 解析token
    //@ts-ignore
    let userInfo = jwtDecode(localStorage.getItem('token'))._doc;
    setUserInfo(userInfo);
  }, []);
  const changeCollapsed = () => {
    // 改变状态值
    props.ChangeCollapsed.changeCollapsed();
  };
  // 退出登录
  const handQuit = () => {
    props.BlogActions.asyncLoginOutAction().then(() => {
      // 清空token
      localStorage.removeItem('token');
      message.success('退出登录成功');
      // 跳转到登录页面
      props.history.push('/admin/login');
    });
  };
  const items: MenuProps['items'] = [
    // {
    //   label: <a href="https://www.antgroup.com">个人中心</a>,
    //   key: 'person',
    // },
    {
      label: (
        <div>
          <div onClick={handQuit}>退出登录</div>
        </div>
      ),
      key: '1',
      danger: true,
    },
  ];
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {/* 获取状态 */}
      {props.isCollapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed} />
      )}
      <div style={{ float: 'right' }}>
        <span>
          欢迎回家：
          <Dropdown menu={{ items }} placement="bottom">
            <b style={{ color: 'blue', cursor: 'pointer' }}>{userInfo.username}</b>
          </Dropdown>
        </span>

        {/* <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> */}
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
