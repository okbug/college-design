import React from "react";
import request from "../../api/index.js";
import Header from "../../Layout/Header.jsx";
import { Form, Input, Button, message } from "antd";
import "./login.css";

const RegisterModal = (props) => {
  const onFinish = async (values) => {
    if (values.repeatPassword !== values.password) {
      message.error("两次输入的密码不同");
      return;
    }
    const res = await request.post("/register", values);
    if (res.code === 200) {
      const {data} = res;
      message.success("注册成功，快去登录吧！");
      props.success(data);
    } else {
      console.log(props);
      message.error(res.msg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        name="name"
        rules={[
          {
            required: true,
            message: "请输入你的用户名",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
            message: "请输入你的邮箱",
          },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "邮箱格式不正确",
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
            message: "请输入密码",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="重复密码"
        name="repeatPassword"
        rules={[
          {
            required: true,
            message: "请再次输入密码",
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
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function (props) {
  return (
    <>
      <RegisterModal className="login-modal" success={props.success} />
    </>
  );
}
