// 导入模板引擎
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoscape = opts.autoscape && true;
    noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoscape: autoscape,
                throwOnUndefined: throwOnUndefined
            }
        )
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {

    // 创建Nunjucks的env对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置content-type
            ctx.response.type = 'text/html';
        }
        await next();
    }
}

module.exports = templating;