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
    .post("/checkUserLogin")
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


export const createDoc = async (title) => {
  return request.post('/createDocument', {title})
}


export const deleteDoc = async (id) => {
  return request.post('/deleteDocument', id)
}