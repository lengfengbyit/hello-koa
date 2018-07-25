var fn_index = async (ctx, next) => {

    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, world!</h1>';
};

var fn_path = async (ctx, next) => {

    let name = ctx.params.name;
    if(!name) {
        // 获取?形式的参数
        let params = ctx.request.query;
        name = params.name;
    }
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>Hello, ${name}</h1>`;
};

module.exports = {
    'GET /test/': fn_index,
    'GET /test/path/:name': fn_path,
    'GET /test/path': fn_path
} 