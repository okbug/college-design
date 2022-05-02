const { query, execute } = require("./sql");
const { genUserId, genRandomString } = require("../common/index");

/**
 * 返回数据库中所有用户的数组
 * @returns user[]
 */
const getAllUsers = () => {
  const queryString = `SELECT * from users`;
  return query(queryString);
};

/**
 *
 * @param {*} usernames string | string[]
 * @returns 用户列表数组
 */
const getUser = async (usernames) => {
  const str = Array.isArray(usernames)
    ? usernames
        .map((username) => {
          return `username='${username}'`;
        })
        .join(" or ")
    : `username='${usernames}'`;
  const text = `select * from users where ${str};`;
  const res = await query(text);
  return res;
};

const register = async ({ name, password, email }) => {
  const [user] = await getUser(name);
  if (user) {
    return { code: "用户名已经存在" };
  }
  const checkMailString = `SELECT * from users where user_email='${email}'`;
  const x = await query(checkMailString);
  if (x.length >= 1) {
    return { code: "邮箱已注册" };
  }

  const text = `
        INSERT INTO users
        (username, user_password, user_email,docs, register_time, last_login_time, userid, token)
        VALUES
        ("${name}", "${password}", "${email}", "[]", NOW(), NOW(), "${genUserId()}", "${genRandomString(
    40
  )}");
    `;

  const res = await query(text);
  const [{ userid }] = await query(
    `select userid from users where username='${name}'`
  );
  if (!res) {
    return {
      code: "err",
    };
  } else {
    return {
      code: "ok",
      userid,
    };
  }
};

const login = async ({ username, password }) => {
  const [user] = await getUser(username);

  if (!user) {
    return {
      code: "用户名错误",
    };
  }

  if (user.user_password !== password) {
    return { code: "密码错误" };
  }

  query(`UPDATE users SET last_login_time=NOW() WHERE username='${username}';`);

  return {
    code: "ok",
    data: user,
  };
};

const updatePassword = async ({ username, nowPassWord, newPassword }) => {
  const nowUsers = await getAllUsers();

  if (!nowUsers.find((user) => user.username === username)) {
    throw new Error("没有该用户信息");
  }

  const user = nowUsers.find((item) => item.username === username);
  if (user.user_password !== nowPassWord) {
    throw new Error("旧密码错误");
  }

  if (nowPassWord === newPassword) {
    throw new Error("新旧密码不能相同");
  }

  const text = `UPDATE users SET user_password='${newPassword}' WHERE username='${username}';`;

  await query(text);
};

const checkUser = async ({ userName, userId, token }) => {
  const text = `select * from users where username='${userName}' and userid='${userId}' and token='${token}'`;
  const res = await getUserInfo({ userName, userId, token });
  return !!res;
};

const getUserInfo = async ({ userName, userId, token }) => {
  const text = `select * from users where username='${userName}' and userid='${userId}' and token='${token}'`;
  const [res] = await query(text);
  return res;
};

class UserManage {
    constructor() {
        this.register = register;
        this.login = login;
        this.updatePassword = updatePassword;
        this.checkUser = checkUser;
        this.getUserInfo = getUserInfo;
    }
}

// 可用！
// register({name:"ajun11", password: '1111aaaa', email: 'ajun@test.com'})

// 可用
// updatePassWord({username: 'ajun', newPassword:'1111aaaa', nowPassWord: '123123123'})

// 可用
// getAllUsers()

// 可用
// getUser(['ajun', 'ajun11'])

// 可用
// login({username: 'ajun', password:"1111aaaa"})

// execute(`update users set favorite = ?`, [JSON.stringify({})])

// query(`select favorite from users`).then(res => console.log(res))

module.exports = new UserManage();
