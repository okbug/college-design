import React, { useEffect, useState } from "react";
import { Layout, List } from "antd";
import { Popconfirm, Toast } from "@douyinfe/semi-ui";
import "./PlayGround.css";
import { getUserInfo, deleteDoc } from "../common";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

const go = (item) =>
  item.type === "doc"
    ? `/${item.type}#/view/${item.id}`
    : `/${item.type}?id=${item.id}`;
  
const DocList = (props) => {
  const navigate = useNavigate();
  const {user} = props;
  return (
    <>
      <div className="doc-list">
        <Content>
          {user.docs ? (
            <List
              bordered
              dataSource={user.docs}
              renderItem={(item) => (
                <>
                  <List.Item className="doc-link">
                    {item.title}
                    {"   "}
                    <span>
                      <a onClick={() => navigate(go(item))}>详情</a>
                    </span>
                    {"|"}
                    <span>
                      <Popconfirm title="确定确认要删除？" onConfirm={() => {
                        deleteDoc({
                          user,
                          id: item.id,
                        }).then(() => {
                          Toast.success('删除成功');
                          props.update()
                        }).catch(err => {
                          Toast.error(err.message);
                        })
                      }}>
                        <a>删除</a>
                      </Popconfirm>
                    </span>
                  </List.Item>
                </>
              )}
            />
          ) : (
            <div>暂无文档</div>
          )}
        </Content>
      </div>
    </>
  );
};

const PlayGround = function () {
  const [user, setUser] = useState({});
  function update() {
    document.title = '用户中心';
    getUserInfo().then(({ data }) => {
      console.log(data);
      const { docs } = data;
      setUser(data);
    });
  }
  useEffect(() => {
    update()
  }, []);
  return (
    <>
      <div className="playground">
        <DocList user={user} update={update}></DocList>
      </div>
    </>
  );
};

export default PlayGround;
