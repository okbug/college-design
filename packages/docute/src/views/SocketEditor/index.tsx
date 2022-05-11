import React, { useEffect, useContext, useState } from "react";

import "./index.scss";
import context from "@/utils/context";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import "./quill.css";
import "./quill.snow.css";
import { useParams } from "react-router-dom";
import { debounce } from "@/utils/common";
import axios from "axios";
import { Button } from "@douyinfe/semi-ui";

let editor;

function load() {
  const dom = document.querySelector("#editor");

  if (!dom) {
    load();
    return;
  }

  Quill.register("modules/cursors", QuillCursors);

  const id = window.location.hash.split("/").pop() || "test";
  const ydoc = new Y.Doc();
  console.log("进来");
  const provider = new WebsocketProvider(
    "ws://1.12.232.197:1234",
    id as string,
    ydoc
  );
  const ytext = ydoc.getText("quill");

  const flag = document.querySelector("ql-toolbar");
  if (flag) return;

  editor = new Quill(dom, {
    modules: {
      cursors: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
      history: {
        // 只有用户可以操作
        userOnly: true,
      },
    },
    placeholder: "Start collaborating...",
    theme: "snow", // or 'bubble'
  });

  editor.on(
    "text-change",
    debounce(function (delta, oldDelta, source) {
      const text = editor.getText();
      if (source === "yjs") return;
      axios
        .post("http://localhost:9527/getDocDetail", { id })
        .then((res) => {
          return res.data.title;
        })
        .then((res) =>
          axios.post("http://localhost:9527/updateDocument", {
            content: text,
            id,
            title: res,
          })
        );
    }, 3000)
  );

  const binding = new QuillBinding(ytext, editor, provider.awareness);

  // @ts-ignore
  // window.example = { provider, ydoc, ytext, binding, Y };
}

function Editor() {
  const params = useParams();
  console.log(params);
  const id = window.location.hash.split("/").pop() || ("test" as string);
  const [title, setTitle] = useState("");
  axios.post("http://localhost:9527/getDocDetail", { id }).then((res) => {
    setTitle(res.data.title);
  });

  useEffect(() => {
    load();
  }, []);
  return (
    <div className="coll-editor">
      <Button onClick={() => {
        window.open(window.location.href.replace('edit', 'wysiwyw-edit'))
      }}>切换编辑器</Button>
      <h1>{title}</h1>
      <div id="editor"></div>
    </div>
  );
}

export default Editor;
