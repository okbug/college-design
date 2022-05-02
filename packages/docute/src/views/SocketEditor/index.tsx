import React, { useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import './quill.css';
import './quill.snow.css';

Quill.register("modules/cursors", QuillCursors);

function load() {
  const dom = document.querySelector("#editor");

  if (!dom) {
      load();
      return;
  }

  console.log(dom)
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    "ws://localhost:1234",
    "ok-test",
    ydoc
  );
  const ytext = ydoc.getText("quill");

  const editor = new Quill(dom, {
    modules: {
      cursors: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
      history: {
        userOnly: true,
      },
    },
    placeholder: "Start collaborating...",
    theme: "snow", // or 'bubble'
  });

  const binding = new QuillBinding(ytext, editor, provider.awareness)

// @ts-ignore
  window.example = { provider, ydoc, ytext, binding, Y }
}

function Editor() {
  useEffect(() => {
      load()
  });
  return (
    <>
      <h1>Editor</h1>
      <div id="editor"></div>
    </>
  );
}

export default Editor;
