import React, { useState, useEffect } from "react";
import { Layout, Dropdown, Menu } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Login from "../views/User/login";
import Register from "../views/User/register";
import { checkUser, createDoc, createPPT } from "../common";
import "./header.less";
import { DownOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Toast } from "@douyinfe/semi-ui";

const Header = (props) => {
  const navigate = useNavigate();
  const [isLogin, setLoginStatus] = useState(false);
  const [username, setName] = useState("");
  const [isLoginModalShow, setLoginModal] = useState(false);
  const [isRegisterModalShow, setRegisterModal] = useState(false);
  const [titleName, setTitleName] = useState("");

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

  const onMenuClick = ({ key }) => {
    console.log(key);
    if (key === "logout") {
      onLogout();
      return;
    }

    if (key === "userInfo") {
      navigate("/user");
    }
  };

  const onLoginSuccess = (res) => {
    onModalCancal();
    const data = res.data.data;
    const { userid, username } = data;
    localStorage.setItem("userid", userid);
    localStorage.setItem("username", username);
    setName(data.username);
    setLoginStatus(true);
  };

  const onRegisterSuccess = (data) => {
    console.log(data);
  };

  const handleCreateNewDocument = () => {
    setCreateModal(true);
  };

  const handleCreateNewPowerPoint = () => {
    setPPTModalShow(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModal(false);
  };

  const handleClosePPTModal = () => {
    setPPTModalShow(false);
    setTitleName("");
  };

  const handleCreateDocTitle = () => {
    if (!titleName) {
      Toast.error("请输入标题");
      return;
    }
    createDoc(titleName)
      .then((res) => {
        Toast.success("创建成功");
        const id = res.id;
        setCreateModal(false);
        navigate("/doc#/view/" + id);
      })
      .catch(() => {
        Toast.error("创建失败");
      });
  };

  const handleCreatePPT = () => {
    if (!titleName) {
      Toast.error("请输入标题");
      return;
    }
    createPPT(titleName).then(res => {
      Toast.success('创建成功');
      navigate('/ppt?id=' + res.id);
    }).catch(err => {
      Toast.error(err.message);
    })
  };

  const [createModalShow, setCreateModal] = useState(false);
  const [PPTModalShow, setPPTModalShow] = useState(false);

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="userInfo">
        <Link to="/user">用户中心</Link>
      </Menu.Item>
      <Menu.Item danger key="logout">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout>
        <Layout.Header className="header">
          <div className="left" onClick={() => navigate("/")}>
            <div className="title">在线协同文档系统</div>
          </div>
          <div className="nav-btn" onClick={handleCreateNewDocument}>
            <Button theme="solid" type="primary">
              + 新建文档
            </Button>
          </div>
          <div className="nav-btn" onClick={handleCreateNewPowerPoint}>
            <Button theme="solid" type="primary">
              + 新建演示文稿
            </Button>
          </div>
          {isLogin ? (
            <Dropdown overlay={menu} placement="bottomLeft">
              <div className="login">
                <a className="ant-dropdown-link">
                  {username} <DownOutlined />
                </a>
              </div>
            </Dropdown>
          ) : (
            <div className="login">
              <Button theme="solid" type="primary" onClick={onLogin}>
                登录
              </Button>
              <Button theme="solid" onClick={onRegister}>
                注册
              </Button>
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

      <Modal
        title="创建文档"
        visible={createModalShow}
        onCancel={handleCloseCreateModal}
        onOk={handleCreateDocTitle}
      >
        <Input onChange={(value) => setTitleName(value)}></Input>
      </Modal>
      <Modal
        visible={PPTModalShow}
        title="创建演示文稿"
        onOk={handleCreatePPT}
        onCancel={handleClosePPTModal}
      >
        <Input onChange={(value) => setTitleName(value)}></Input>
      </Modal>
    </>
  );
};

export default Header;
