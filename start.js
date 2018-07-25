/**
 * 不写在app.js的原因，是方便写单元测试
 */
const app = require('./app');

app.listen(3000);

console.log('app started at port 3000');