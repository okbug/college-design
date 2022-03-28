import React, { useState, useContext } from "react";
import { Input, Button, message } from "antd";
import "./index.scss";
import context from "@/utils/context";

function Create() {
  const [value, setValue] = useState<string>("");
  const { event } = useContext(context);
  const handleCreateNewDocument = () => {
    if (!value) {
      message.error("请输入标题");
      return;
    }

    event
      .emitOnce("post", "createDocument", {
        title: value,
      })
      .then(() => {
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="create-document">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="请输入标题"
      ></Input>
      <Button type="primary" onClick={handleCreateNewDocument}>
        完成
      </Button>
    </div>
  );
}

export default Create;
