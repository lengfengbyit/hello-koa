// 导入koa 和koa 1.x不同，在koa2中，我们导入的是一个class,因此用大写的Koa表示。
const Koa = require('koa');
const app = new Koa();
// 用来解析post参数
const bodyParser = require('koa-bodyparser');
// 判断是否是生产环境
const isPro = process.env.NODE_ENV == 'production';
// 导入constrollers
const constroller = require('./middleware/constroller');
// 导入模板渲染中间件
const tplRender = require('./middleware/tpl-reader');
// 导入静态文件中间件
const statisFiles = require('./middleware/static-files');

console.log('node_env: ' + process.env.NODE_ENV);

// 中间件打印日志
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`);
    await next();
});

app.use(statisFiles('/static/', __dirname + '/static'));

app.use(tplRender('views', {
    noCache: !isPro, // 是否不使用缓存
    watch: !isPro
}));

app.use(bodyParser());
app.use(constroller());


module.exports = app;

// app.listen(3000);
// console.log('app started at port 3000 ...');