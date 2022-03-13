import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "vditor/src/assets/scss/index.scss";
import Vditor from "vditor";
import { debounce } from "../../utils/common";
import context from "@/utils/context";
import { useEditor } from "../../utils/useEditor";
import { Button } from "antd";
import './index.scss';

export default function Editor() {
  const { event } = useContext(context);

  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [vditor, setVditor] = useState<Vditor | null>(null);

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
      setTimeout(() => {
        vditor.setValue(res.content.text);
      }, 500);
    });
  }, [event, id, vditor]);

  const onInput = debounce(() => {
    if (!vditor) {
      return;
    }

    const text = vditor.getValue();
    const html = vditor.getHTML();
    if (text.trim() === "") {
      return;
    }

    console.log(text, html);
  }, 300);

  const finishEdit = () => {
    event.emit('updateDocument', {
      id,
      content: vditor?.getValue(),
    })
    navigate(`/view/${id}`)
  }

  return (
    <>
      <Button type="primary" onClick={finishEdit}>
        完成
      </Button>
      <div id="editor" onInput={onInput}></div>
    </>
  );
}
