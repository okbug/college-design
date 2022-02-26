const {query} = require('./sql')

const getDocListByUser = (name) => {
    const text = `select docs from users where username='${name}'`
    query(text).then(res => {
        console.log(res);
    })
}

getDocListByUser('ajun')