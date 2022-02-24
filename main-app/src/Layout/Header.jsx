import React from "react";
import { Button, Layout } from "antd";

import "./header.css";

const Header = () => {
  return (
    <Layout>
      <Layout.Header>
      <span className="title">在线协同文档系统</span>
        <div className="login">
          <Button type="primary">登录</Button>
          <Button>注册</Button>
        </div>
      </Layout.Header>
    </Layout>
  );
};

export default Header;
