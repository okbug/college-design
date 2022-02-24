import React, { useEffect, useState } from "react";
import "vditor/src/assets/scss/index.scss";
import Vditor from 'vditor';
import {debounce} from '../../utils/common';

import { useEditor } from "../../utils/useEditor";

export default function Editor() {
  const [vditor, setVditor] = useState<Vditor | null>(null);
  useEditor({
    options: {
      width: 600,
      height: 600,
    },
    bindFn: setVditor,
    defaultText: 'Hello World!'
  });

  useEffect(() => {
    console.log(vditor)
  })

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
