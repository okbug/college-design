import React from 'react'
import request from '../../api/index.js';
import { Form, Input  } from 'antd';
import {refreshPage} from '../../utils/index.js';
import './login.css'
import { Button, Toast } from '@douyinfe/semi-ui';


const LoginModal = (props) => {
  const onFinish = async (values) => {
    const res = await request.post('/login', values)
    if (res.code === 200) {
      Toast.success('登录成功')
      props.success(res);
      refreshPage()
    } else {
      console.log(props)
      Toast.error(res.msg)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
    className={props.className}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入你的用户名',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};


export default function(props) {
    return (
        <>
        <LoginModal className="login-modal" success={props.success} />
        </>
    )
}