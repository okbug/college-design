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
      Toast.error("???????????????");
      return;
    }
    createDoc(titleName)
      .then((res) => {
        Toast.success("????????????");
        const id = res.id;
        setCreateModal(false);
        navigate("/doc#/view/" + id);
      })
      .catch(() => {
        Toast.error("????????????");
      });
  };

  const handleCreatePPT = () => {
    if (!titleName) {
      Toast.error("???????????????");
      return;
    }
    createPPT(titleName).then(res => {
      Toast.success('????????????');
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
        <Link to="/user">????????????</Link>
      </Menu.Item>
      <Menu.Item danger key="logout">
        <span>????????????</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout>
        <Layout.Header className="header">
          <div className="left" onClick={() => navigate("/")}>
            <div className="title">????????????????????????</div>
          </div>
          <div className="nav-btn" onClick={handleCreateNewDocument}>
            <Button theme="solid" type="primary">
              + ????????????
            </Button>
          </div>
          <div className="nav-btn" onClick={handleCreateNewPowerPoint}>
            <Button theme="solid" type="primary">
              + ??????????????????
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
                ??????
              </Button>
              <Button theme="solid" onClick={onRegister}>
                ??????
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
        title="????????????"
        visible={createModalShow}
        onCancel={handleCloseCreateModal}
        onOk={handleCreateDocTitle}
      >
        <Input onChange={(value) => setTitleName(value)}></Input>
      </Modal>
      <Modal
        visible={PPTModalShow}
        title="??????????????????"
        onOk={handleCreatePPT}
        onCancel={handleClosePPTModal}
      >
        <Input onChange={(value) => setTitleName(value)}></Input>
      </Modal>
    </>
  );
};

export default Header;
