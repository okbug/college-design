const mysql = require('mysql2');
const {password, database} = require('../info.json')

const config = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password,
    database,
}

const connection = mysql.createConnection(config);

connection.connect(err => {
    if (err) {
        console.log('数据库连接失败！', err)
    } else {
        console.log('数据库连接成功');
    }
})

connection.query(`SELECT * from study where name='okbug'`, (err, res) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(res)
})