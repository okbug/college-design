import React, { useContext, useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import "vditor/src/assets/scss/index.scss";
import Vditor from 'vditor';
import {debounce} from '../../utils/common';
import context from "@/utils/context";
import { useEditor } from "../../utils/useEditor";

export default function Editor() {
  const event = useContext(context);
  
  const {id} = useParams();
  
  
  const [text, setText] = useState<string>('')
  
  const [vditor, setVditor] = useState<Vditor | null>(null);
  useEditor({
    options: {
      width: 600,
      height: 600,
    },
    bindFn: setVditor,
    defaultText: id ? id : 'Hello World!'
  });

  useEffect(() => {
    if (!vditor) return;
    Promise.all(event.emit('post', 'getDocDetail', {
      id
    })).then(([res]) => {
      setTimeout(() => {
        vditor.setValue(res.content.text)
      }, 50)
    })
  }, [event, id, vditor])

  const onInput = debounce(() => {
    if (!vditor) {
      return;
    }

    const text = vditor.getValue();
    const html = vditor.getHTML()
    if (text.trim() === '') {
      return;
    }

    console.log(text, html);
  }, 300)

  return (
    <>
      <div id="editor" onInput={onInput}></div>
    </>
  );
}
