import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '@/redux/actionCreator';
import { LoginFormValues } from '@/types/login';
import '@/styles/login.less';
function Login(props: any) {
  const onFinish = (values: LoginFormValues) => {
    props.authActions.asyncLoginAction({
        username: values.username,
        password: values.password,
    }).then((res: { code: number; msg: string }) => {
      if (res.code === 0) {
        message.success('登录成功，跳转到首页~');
        props.history.replace('/admin/home');
      } else {
        message.error('系统异常，请联系管理员进行处理!')
      }
      });
  };
  const handClick = () => {
    props.history.push('/admin/register');
  };
  // 用户名校验
  const validateName = (_rule: any, value: string) => {
    if (!value) {
      return Promise.reject('请输入用户名');
    }
    if (value.length < 2 || value.length > 20) {
      return Promise.reject('字符不能小于2大于20');
    } else {
      const reg = /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/;
      if (!reg.test(value)) {
        return Promise.reject('用户名不能包含特殊字符');
      } else {
        return Promise.resolve();
      }
    }
  };
  // 密码校验
  const validatePassword = (_rule: any, value: string) => {
    if (!value) {
      return Promise.reject('请输入密码');
    }
    if (value.length < 6 || value.length > 20) {
      return Promise.reject('字符不能小于6大于20');
    } else {
      const reg = /^[A-Za-z0-9_]{6,20}$/;
      if (!reg.test(value)) {
        return Promise.reject('必须是长度为6-20位,字母大小,下划线组成');
      } else {
        return Promise.resolve();
      }
    }
  };
  // 免登进入
  const handleExemption = () => {
    const exemName = "guest";
    const exemPassword = "123456"
    props.authActions.asyncLoginAction({
      username: exemName,
      password: exemPassword,
    }).then((res: { code: number; msg: string }) => {
      if (res.code === 0) {
        message.success('欢迎访客登录~');
        props.history.replace('/admin/home');
      } else {
        message.error('系统异常，请联系管理员进行处理!')
      }
    });
  }
  return (
    <div className="login" style={{ userSelect: 'none' }}>
      <Card style={{ width: '50%', margin: '0 auto' }} title={<span style={{ color: '#fff', fontWeight: 'bold' }}>欢迎进入登录页面</span>}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ validator: validateName }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ validator: validatePassword }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              点击登录
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ color: '#1890FF', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleExemption}>免登入口</p>
              <p style={{ float: 'right', color: '#1890FF', cursor: 'pointer', fontWeight: 'bold' }} onClick={handClick}>
              没有账号？点我注册
            </p>
            </div>
            {/* 忘记密码 */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Login);
