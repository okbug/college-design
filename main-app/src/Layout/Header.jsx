import React, { useState, useEffect } from "react";
import { Button, Layout, Modal, Dropdown, Menu } from "antd";
import {Link, useNavigate} from 'react-router-dom';
import Login from "../views/User/login";
import Register from "../views/User/register";
import { checkUser } from "../common";
import "./header.css";
import { DownOutlined } from '@ant-design/icons';

const Header = (props) => {
  const navigate = useNavigate()
  const [isLogin, setLoginStatus] = useState(false);
  const [username, setName] = useState("");
  const [isLoginModalShow, setLoginModal] = useState(false);
  const [isRegisterModalShow, setRegisterModal] = useState(false);

  

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const userName = localStorage.getItem("username");
    if (!userId) {
      return;
    }
    checkUser().then((res) => {
      if (res) {
        setName(userName);
        setLoginStatus(true);
      }
    });
  });

  const onLogin = () => {
    setLoginModal(true);
  };

  const onModalCancal = () => {
    setLoginModal(false);
  };

  const onLogout = () => {
    setName("");
    setLoginStatus(false);
    localStorage.setItem("username", "");
    localStorage.setItem("userid", "");
  };

  const onRegisterModalCancal = () => {
    setRegisterModal(false);
  };
  const onRegister = () => {
    setRegisterModal(true);
  };

  const onMenuClick = ({key}) => {
    console.log(key);
    if (key === 'logout') {
      onLogout()
      return;
    }

    if (key === 'userInfo') {
      navigate('/user')
    }
  }

  const onLoginSuccess = (res) => {
    onModalCancal();
    const data = res.data.data;
    console.log(data);
    const { userid, username } = data;
    localStorage.setItem("userid", userid);
    localStorage.setItem("username", username);
    setName(data.username);
    setLoginStatus(true);
  };

  const onRegisterSuccess = (data) => {
    console.log(data);
  };

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="userInfo">
        <Link to="/user">用户中心</Link>
      </Menu.Item>
      <Menu.Item danger key="logout">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Layout>
        <Layout.Header>
          <div className="left" onClick={() => navigate('/')}>
            <span className="title">
              在线协同文档系统
            </span>
          </div>
          {isLogin ? (
            <Dropdown overlay={menu} placement="bottomLeft">
              <div className="login">
                <a
                  className="ant-dropdown-link"
                >
                  {username} <DownOutlined />
                </a>
              </div>
            </Dropdown>
          ) : (
            <div className="login">
              <Button type="primary" onClick={onLogin}>
                登录
              </Button>
              <Button onClick={onRegister}>注册</Button>
            </div>
          )}
        </Layout.Header>
      </Layout>
      <Modal
        visible={isLoginModalShow}
        onOk={onModalCancal}
        onCancel={onModalCancal}
      >
        <Login success={onLoginSuccess} />
      </Modal>

      <Modal
        visible={isRegisterModalShow}
        onOk={onRegisterModalCancal}
        onCancel={onRegisterModalCancal}
      >
        <Register success={onRegisterSuccess} />
      </Modal>
    </>
  );
};

export default Header;
