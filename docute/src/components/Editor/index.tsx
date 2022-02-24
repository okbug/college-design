import React from "react";
import "vditor/src/assets/scss/index.scss";

import { useEditor } from "../../utils/useEditor";

export default function Editor() {
  useEditor({
    width: 600,
    height: 600,
  });

  return (
    <>
      <div id="editor"></div>
    </>
  );
}
