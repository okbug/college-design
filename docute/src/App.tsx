import React, { useState } from "react";
import Editor from "@/components/Editor";
import View from "@/components/View";
import { Button } from 'antd';

function App() {
  const [mode, changeMode] = useState(true)
  return (
    <div className="container">
      <Button type="primary" onClick={() => changeMode(!mode)}>{mode ? '编辑' : '完成'}</Button>
      {
        mode ? <View />
        :
        <Editor />
      }
    </div>
  );
}

export default App;
