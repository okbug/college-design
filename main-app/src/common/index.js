import request from "../api";

export const checkUser = () => {
  const [userName, userId] = [
    localStorage.getItem("username"),
    localStorage.getItem("userid"),
  ];

  if (!userName || !userId) {
      return Promise.resolve(false);
  }
  return request
    .post("/checkUserLogin", {
      userName,
      userId
    })
    .then((res) => {
      if (res.code === 200) {
        return true;
      } else {
        return false;
      }
    });
};

export const getUserInfo = async () => {
    const [userName, userId] = [
        localStorage.getItem("username"),
        localStorage.getItem("userid"),
      ];
    
      if (!userName || !userId) {
          return null;
      }

      return request.post('/getUserInfo', {userName, userId});
}