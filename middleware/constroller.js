const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if(url.startsWith('GET ')) {
            let path = url.substring(4);
            console.log(`register URL mapping: GET ${path}`)
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            console.log(`register URL mapping: POST ${path}`);
            router.post(path, mapping[url]);
        } else {
            console.log(`invalid URL: ${url}`); 
        }
    }
}

function addControllers(router, dir) {
    var files = fs.readdirSync(dir);

    var js_files = files.filter((f) => {
        return f.endsWith('.js') && f != 'constroller.js';
    });

    for(var f of js_files) {
        console.log(`process constroller: ${dir}/${f}...`);
        let mapping = require(dir + '/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let constroller_dir = dir || __dirname + '/../' + 'constrollers',
        router = require('koa-router')();
    addControllers(router, constroller_dir)
    return router.routes();
}