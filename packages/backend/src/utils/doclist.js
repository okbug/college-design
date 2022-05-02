const { genRandomString } = require("../common");
const { query, execute } = require("./sql");
const { defaultPPTContent } = require("../common/constant");

const getDocListByUser = (name) => {
  const text = `select docs from users where username='${name}'`;
  query(text).then((res) => {
    if (!res.length) return;
    const [{ docs }] = res;
    console.log(docs);
  });
};

/**
 *
 * @param {string} id 文档的ID
 * @returns {documentDetail} 文档的信息
 */
const getDocDetail = async (id) => {
  const text = `select * from docs where id='${id}'`;
  const res = await query(text);
  if (!res.length) {
    return;
  }
  const [docDetail] = res;
  return docDetail;
};

// getDocDetail('testppt');

/**
 *
 * @param {id, content} params
 * @returns
 */
const updateDoc = async (params) => {
  try {
    const { content } = await getDocDetail(params.id);

    content.text = params.content;
    const text = `update docs set content = ?,title = ? WHERE id= ?`;
    await execute(text, [
      JSON.stringify(params.content),
      params.title || "",
      params.id,
    ]);

    return { ok: 1 };
  } catch (error) {
    return error;
  }
};

/**
 * 通过用户名和标题创建一个空的文档
 * 先在docs创建一个type为doc的文档（自动生成id）
 * 再把id放到users表的docs数组里面
 */
const createDocument = async (params) => {
  const { title, userName } = params;
  // 创建文档
  const users = [{ name: userName }];
  const id = genRandomString({
    number: true,
    lower: true,
    upper: true,
  });
  console.log(id);
  const createSQL = `
  insert into docs
  (content, view_users, edit_users,type,id,title)
  values
  (?, ?,?,'doc', ?, ?)
  `;
  await execute(createSQL, [
    `""`,
    JSON.stringify(users),
    JSON.stringify(users),
    id,
    title
  ]);

  const [user] = await query(
    `select docs from users where username = '${userName}'`
  );
  const docs = user.docs;
  docs.push({
    id,
    title,
    type: "doc",
  });
  await execute(`update users set docs = ? where username = '${userName}'`, [
    JSON.stringify(docs),
  ]);

  return {
    ok: 1,
    id,
  };
};
// createDocument({userName: 'a', title: 'now test'});

/**
 * 把docs表里面删除
 * 再把users中 拥有这个文档的用户的docs列表中删除该文档
 */
const deleteDocument = async (params) => {
  const { id, userName } = params;
  // 删除表
  const deleteFromDocs = `
    delete from docs where id='${id}'
  `;
  const getUserInfo = `
    select docs from users where username = '${userName}'
  `;

  await query(deleteFromDocs);
  const [user] = await query(getUserInfo);
  let docs = user.docs;
  const users = JSON.stringify([{ name: userName }]);
  docs = docs.filter((item) => item.id !== id);
  await execute(`update users set docs = ? where username = ?`, [
    JSON.stringify(docs),
    userName,
  ]);

  return {
    ok: 1,
  };
};

/**
 * 在docs下set一个type为ppt的内容
 * 在users中添加一个docs
 */
const createPPT = async ({ title, userName }) => {
  const id = genRandomString({
    number: true,
    lower: true,
    upper: true,
  });
  console.log(id);
  const users = JSON.stringify([{ name: userName }]);

  const createSQL = `
  insert into docs
  (content, view_users, edit_users,type,id,title)
  values
  (?, ?,?,'ppt', ?,?)
  `;
  await execute(createSQL, [
    JSON.stringify(defaultPPTContent),
    users,
    users,
    id,
    title
  ]);

  const getUserInfo = `
    select docs from users where username = '${userName}'
  `;

  const [user] = await query(getUserInfo);
  let docs = user.docs;
  docs.push({
    id,
    title,
    type: "ppt",
  });

  await execute(`update users set docs = ? where username = ?`, [
    JSON.stringify(docs),
    userName,
  ]);

  return {
    ok: 1,
    data: {
      id,
      title,
    },
  };
};

class Document {
  controller() {
    return {
      getDocListByUser,
      getDocDetail,
      updateDoc,
      createDocument,
      deleteDocument,
      createPPT,
    };
  }
}

module.exports = new Document().controller();
