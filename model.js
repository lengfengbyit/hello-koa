// 自动导入model

const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};

for(let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}

//创建一个新函数
module.exports.sync = () => {
    // 根据modle自动创建表结构
    db.sync();
};