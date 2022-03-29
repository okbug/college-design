import React, { useState, useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from '@douyinfe/semi-ui';
import context from "./utils/context";

function App() {
  const navigate = useNavigate()
  const {event} = useContext(context);
  
  const {id} = useParams();
  const [mode, setMode] = useState(true);
  const changeMode = () => {
    navigate((mode ? '/edit/' : '/view/') + id);
    setMode(!mode);
    if (!mode) {
      console.log('完成')
      event.emit('getDocumentDetail');
    }
  }
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}

export default App;
