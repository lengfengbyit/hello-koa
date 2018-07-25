/**
 * 初始化数据库，根据model自动创建表结构
 */

 const model = require('./model');

model.sync();
console.log('init db ok');

process.exit(0);