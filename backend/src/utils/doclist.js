const {query, execute} = require('./sql')

const getDocListByUser = (name) => {
    const text = `select docs from users where username='${name}'`
    query(text).then(res => {
        if (!res.length) return;
        const [{docs}] = res;
        console.log(docs)
    })
}

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
}

// getDocDetail('testppt');

const updateDoc = async (params) => {
    const {content} = await getDocDetail(params.id);
    content.text = params.content;
    console.log(1, content);
    const text = `update docs set content = ? WHERE id= ?`
    console.log(2, text);
    await execute(text, [JSON.stringify(content), params.id]);
    // console.log(text);
    // ok await query(`update docs set type='doc' where id='testdoc'`)
    
    return {ok: 1}
}

module.exports = {
    getDocListByUser,
    getDocDetail,
    updateDoc,
}