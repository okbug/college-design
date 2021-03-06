import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "vditor/src/assets/scss/index.scss";
import Vditor from "vditor";
import { debounce } from "../../utils/common";
import context from "@/utils/context";
import { useEditor } from "../../utils/useEditor";
import { Button, Input, Toast } from "@douyinfe/semi-ui";
import "./index.scss";

export default function Editor() {
  const { event } = useContext(context);

  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [vditor, setVditor] = useState<Vditor | null>(null);
  const [title, setTitle] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);

  useEditor({
    options: {
      width: 600,
      height: 600,
      placeholder: id ? "loading ... " : "Just Write Something!",
    },
    bindFn: setVditor,
  });

  useEffect(() => {
    if (!vditor) return;
    Promise.all(
      event.emit("post", "getDocDetail", {
        id,
      })
    ).then(([res]) => {
      let timer = setInterval(() => {
        if (document.querySelector("#editor")) {
          vditor.setValue(res.content);
          setTitle(res.title || "");
          setEditable(true);
          document.title = `编辑 - ${res.title}`;
          clearInterval(timer);
        }
      }, 500);
    });
  }, [event, id, vditor]);

  const onInput = debounce(() => {
    if (!vditor) {
      return;
    }

    const text = vditor.getValue();
    if (text.trim() === "") {
      return;
    }
  }, 300);

  const finishEdit = () => {
    if (!vditor) return;
    if (!title.trim()) {
      Toast.error("请输入标题");
      return;
    }
    console.log(vditor.getValue());
    // 更新文档
    Promise.all([
      event.emit("updateDocument", {
        id,
        content: vditor?.getValue(),
        title,
      }),
    ])
      .then(() => {
        Toast.success("更新成功");
        navigate(`/view/${id}`);
      })
      .catch(() => {
        Toast.error("更新失败，请重试");
      });
  };

  return (
    <>
      <Button type="primary" onClick={finishEdit} disabled={!editable}>
        {editable ? "完成" : "加载中"}
      </Button>
      <Input
        type="text"
        className="edit-title"
        onChange={(text) => {
          setTitle(text);
        }}
        value={title}
      />
      <div id="editor" onInput={onInput}></div>
    </>
  );
}
