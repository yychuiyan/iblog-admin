import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import SideMenu from '@/components/layout/sidemenu';
import Header from '@/components/layout/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './index.less';
const Home = lazy(() => import('@/pages/home'));
const NotFound = lazy(() => import('@/pages/404'));
const ArticleList = lazy(() => import('@/pages/articles'));
const PermissionList = lazy(() => import('@/pages/permission'))
const RuleList = lazy(() => import('@/pages/permission/RoleList'))
const Category = lazy(() => import('@/pages/category'));
const Tags = lazy(() => import('@/pages/tags'));
const About = lazy(() => import('@/pages/about'));
const Comment = lazy(() => import('@/pages/comment'));
const Administrator = lazy(() => import('@/pages/admin'));
const UserInfo = lazy(() => import('@/pages/users'));
const ArticleAdd = lazy(() => import('@/pages/articles/add'));
const ArticleUpdate = lazy(() => import('@/pages/articles/update'));
const Message = lazy(() => import('@/pages/message'));
const Friendly = lazy(() => import('@/pages/friendly'));
const Essay = lazy(() => import('@/pages/essay'));
const Reader = lazy(() => import('@/pages/reader'));
const Affiche = lazy(() => import('@/pages/affiche'));
const Apothegm = lazy(() => import('@/pages/apothegm'));
const FE_Project = lazy(() => import('@/pages/navigation/fe-project'));
const FE_Tools = lazy(() => import('@/pages/navigation/fe-tools'));
const FE_Website = lazy(() => import('@/pages/navigation/fe-website'));
const NavigationCategory = lazy(() => import('@/pages/navigation_category'));
const { Content } = Layout;
const LayoutIndex = (props: any) => {
  NProgress.start();
  NProgress.done();
  return (
    <Layout>
      {/*侧边栏*/}
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <Header></Header>
        {/*使用content包裹内容*/}
        <Content
          className="site-layout-background"
          style={{
            margin: '10px 10px',
            padding: 10,
            userSelect: 'none'
            // minHeight: 280,
            // overflow: 'auto',
          }}
        >
          <Suspense fallback={<div></div>}>
            <Spin size="large" spinning={props.isLoading}>
              <Switch>
                <Route path="/admin/home" component={Home}></Route>
                <Route path="/admin/article/list" component={ArticleList}></Route>
                <Route path="/admin/permission/list" component={PermissionList}></Route>
                <Route path="/admin/permission/rule" component={RuleList}></Route>
                <Route path="/admin/article/category" component={Category}></Route>
                <Route path="/admin/article/tags" component={Tags}></Route>
                <Route path="/admin/article/insert" component={ArticleAdd}></Route>
                <Route path="/admin/article/update/:id" component={ArticleUpdate}></Route>
                <Route path="/admin/article/comment" component={Comment}></Route>
                <Route path="/admin/about" component={About}></Route>
                <Route path="/admin/permission/admin" component={Administrator}></Route>
                <Route path="/admin/user/list" component={UserInfo}></Route>
                <Route path="/admin/message" component={Message}></Route>
                <Route path="/admin/friendly" component={Friendly}></Route>
                <Route path="/admin/essay" component={Essay}></Route>
                <Route path="/admin/reader" component={Reader}></Route>
                <Route path="/admin/affiche" component={Affiche}></Route>
                <Route path="/admin/apothegm" component={Apothegm}></Route>
                <Route path="/admin/navigation/project" component={FE_Project}></Route>
                <Route path="/admin/navigation/tools" component={FE_Tools}></Route>
                <Route path="/admin/navigation/website" component={FE_Website}></Route>
                <Route path="/admin/navigation/category" component={NavigationCategory}></Route>
                <Route path="*" component={NotFound}></Route>
              </Switch>
            </Spin>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
// 将状态映射为属性
const mapStateToProps = (state: any) => {
  return {
    isLoading: state.LoadingReducer.isLoading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
