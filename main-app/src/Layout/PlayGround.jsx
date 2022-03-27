import React, { useEffect, useState } from "react";
import { Layout, List } from "antd";
import "./PlayGround.css";
import { getUserInfo } from "../common";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

const go = (item) =>
  item.type === "doc"
    ? `/${item.type}#/view/${item.id}`
    : `/${item.type}?id=${item.id}`;
const DocList = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="doc-list">
        <Content>
          {props.docs ? (
            <List
              bordered
              dataSource={props.docs}
              renderItem={(item) => (
                <>
                  <List.Item className="doc-link">
                    {item.id}{" "}
                    <span>
                      <a onClick={() => navigate(go(item))}>详情</a>
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
  const [userDocs, setUserDocs] = useState(null);
  useEffect(() => {
    getUserInfo().then(({ data }) => {
      console.log(data);
      const { docs } = data;
      setUserDocs(docs);
    });
  }, []);
  return (
    <>
      <div className="playground">
        <DocList docs={userDocs}></DocList>
      </div>
    </>
  );
};

export default PlayGround;
