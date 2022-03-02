const {query} = require('./sql')

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

module.exports = {
    getDocListByUser,
    getDocDetail,
}