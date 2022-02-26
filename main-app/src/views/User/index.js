import React, { useEffect, useState } from "react";
import { message } from 'antd';
import { checkUser, getUserInfo } from "../../common";


const User = () => {
  const userName = localStorage.getItem('username')
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
        {userInfo && Object.keys(userInfo).map((item ,key) => <div key={key}>{item}: {userInfo[item]}</div>)}
      </div>
    </>
  );
};


export default User