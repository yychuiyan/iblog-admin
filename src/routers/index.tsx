import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Layout = lazy(() => import('@/pages/layout'));
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
const Routers = () => {
  return (
    <div>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin/login" component={Login}></Route>
            <Route path="/admin/register" component={Register}></Route>
            <Redirect to="/admin/home" from="/" exact></Redirect>
            <Route
              path="/"
              render={() =>
                localStorage.getItem('token') ? <Layout /> : <Redirect to="/admin/login"></Redirect>
              }
            ></Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};
export default Routers;
