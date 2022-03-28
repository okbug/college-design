const { query, execute } = require("./sql");

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

// updateDoc({
//     content: [{"id":"test123456","elements":[{"type":"shape","id":"4cbRxp","left":0,"top":200,"width":546,"height":362.5,"viewBox":[200,200],"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"opacity":0.7,"rotate":0},{"type":"shape","id":"ookHrf","left":0,"top":0,"width":300,"height":320,"viewBox":[200,200],"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"flipV":true,"rotate":0},{"type":"text","id":"idn7Mx","left":355,"top":65.25,"width":585,"height":154.390625,"lineHeight":1.2,"content":"<p style=\"\"><strong><span style=\"font-size: 112px\">林建恒</span></strong></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"text","id":"7stmVP","left":355,"top":253.25,"width":585,"height":56,"content":"<p style=\"\"><span style=\"font-size: 24px\">github: https://github.com/okbug</span></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"line","id":"FnpZs4","left":361,"top":238,"start":[0,0],"end":[549,0],"points":["",""],"color":"#5b9bd5","style":"solid","width":2}],"background":{"type":"solid","color":"#ffffff"}},{"id":"VRbHlEmr","elements":[],"background":{"type":"solid","color":"#fff"}}],
//     id: 'testppt'
// }).then(res => {
//     console.log('改好了', res)
// })

module.exports = {
  getDocListByUser,
  getDocDetail,
  updateDoc,
};
