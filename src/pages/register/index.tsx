import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import * as BlogActions from '@/redux/actionCreator';
import './index.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RegisterFormValues } from '@/types/register';
const Register = (props: any) => {
  // 提交注册
  const onFinish = (values: RegisterFormValues) => {
    if (values.password !== values.verifyPassword) {
      return message.error('两次密码不相同');
    }

    props.BlogActions.asyncRegisterAction({
      username: values.username,
      password: values.password,
    }).then((res: { code: number; }) => {
      if (res.code === 1) {
        return message.error('用户名已存在');
      }
      message.success('注册成功,即将跳转到登录页面^_^');
      setTimeout(() => {
        props.history.push('/api/login');
      }, 2000);
    });
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
  return (
    <div className="login">
      <Card style={{ width: '50%', margin: '0 auto' }} title="注册页面">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                validator: validateName,
              },
            ]}
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
          <Form.Item name="verifyPassword" rules={[{ validator: validatePassword }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="确认密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              点击注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Register);
