import React, { useEffect, useState } from "react";
import { Layout, List } from "antd";
import {
  Popconfirm as PopConfirm,
  Toast,
  Tabs,
  TabPane,
} from "@douyinfe/semi-ui";
import "./PlayGround.css";
import { getUserInfo, deleteDoc, cancelFavorite as cancel } from "../common";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

{
  /*  */
}

const go = (item) =>
  item.type === "doc"
    ? `/${item.type}#/view/${item.id}`
    : `/${item.type}?id=${item.id}`;

const DocList = (props) => {
  const navigate = useNavigate();
  const { user } = props;
  console.log(user);
  console.log(user.favorite, user.docs);
  const cancelFavorite = (id) => {
    const {userName} = user;
    console.log(userName, id);
    cancel({
      userName,
      id,
      options: 'false'
    })
  }
  return (
    <>
      <div className="doc-list">
        <Tabs type="line">
          <TabPane tab="收藏" itemKey="1">
            <Content>
              <List
                bordered
                dataSource={user.favorite || []}
                renderItem={(item) => (
                  <>
                    <List.Item className="doc-link">
                      <span>
                        <a onClick={() => window.open(go(item))}>
                          {item.title}
                        </a>{" "}
                        |{" "}
                      </span>
                      <span>
                        <a onClick={() => cancelFavorite(item.id)}>取消收藏</a>
                      </span>
                    </List.Item>
                  </>
                )}
              ></List>
            </Content>
          </TabPane>
          <TabPane tab="我的文档">
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
                          <a onClick={() => window.open(go(item))}>详情</a>
                        </span>
                        {"|"}
                        <span>
                          <PopConfirm
                            title="确定确认要删除？"
                            onConfirm={() => {
                              deleteDoc({
                                user,
                                id: item.id,
                              })
                                .then(() => {
                                  Toast.success("删除成功");
                                  props.update();
                                })
                                .catch((err) => {
                                  Toast.error(err.message);
                                });
                            }}
                          >
                            <a>删除</a>
                          </PopConfirm>
                        </span>
                      </List.Item>
                    </>
                  )}
                />
              ) : (
                <div>暂无文档</div>
              )}
            </Content>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

const PlayGround = function () {
  const [user, setUser] = useState({});
  function update() {
    document.title = "用户中心";
    getUserInfo().then(({ data }) => {
      console.log(data);
      const { docs } = data;
      setUser(data);
    });
  }
  useEffect(() => {
    update();
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
