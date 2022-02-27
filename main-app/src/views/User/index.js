import React, { useEffect, useState } from "react";
import { Button, message } from 'antd';
import { checkUser, getUserInfo } from "@/common";
import {Link} from 'react-router-dom'
import PlayGround from "@/Layout/PlayGround.jsx";

const User = () => {
  const userName = localStorage.getItem('username')
  console.log(userName);
  const [userInfo, setUserInfo] = useState(null);
  const goBack = () => {
    message.error('请登录')
  }
  useEffect(() => {
    checkUser().then(res => {
      if (res) {
        getUserInfo().then(({data}) => {
          setUserInfo(data);
        })
      } else {
        goBack()
      }
      
    })
  }, [userName])
  return (
    <>
      <h1>用户界面</h1>
      <div>
        {userInfo &&
         (
           <>{JSON.stringify(userInfo)}</>
         )
        }
      </div>
      <PlayGround />
    </>
  );
};


export default User