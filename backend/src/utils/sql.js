const mysql = require('mysql2');
const { password, database } = require('../../info.json')

const config = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password,
    database,
}

const connection = mysql.createConnection(config);

// 连接数据库
connection.connect(err => {
    if (err) {
        console.log('数据库连接失败！', err)
    } else {
        console.log('数据库连接成功');
    }
})

const query = (str) => {
    return new Promise((resolve, reject) => {
        connection.query(str, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * 
 * @param tableName 表的名称
 * keys 字段名称，string数组
 * values 要自带单引号或者双引号的 字符串 | 其他东西数组  要与keys映射
 */
const insert = ({tableName, keys, values}) => {
    const text = `
        INSERT INTO ${tableName}
        (${keys.join(', ')})
        VALUES
        (${values.join(', ')});
    `
}

module.exports = {
    connection,
    query,
    insert
}