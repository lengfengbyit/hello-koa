const model = require('../model');
let Pet = model.pet;
console.log('model:' + model);
console.log('Pet:' + Pet);

var fn_index = async(ctx, next) => {

    var users = await Pet.findAll();
    ctx.render('index.html', {
        users: users
    });
};

var fn_reg = async (ctx, next) => {
    ctx.render('reg.html', {
        title: '注册页面'
    });
};

var fn_reg_post = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`name: ${name}, password: ${password}`);
    if (name != '' && password != '') {
        
        var now = Date.now();
        var dog = await Pet.create({
            id: 'g-' + now,
            name: name,
            gender:false,
            birth: '2008-08-08',
            createdAt: now, 
            updatedAt: now,
            version: 0
        });
        console.log('created:' + JSON.stringify(dog))

        ctx.redirect('/');
        
    } else {
        ctx.response.body = `<h1>Login Failed!</h1>
        <p><a href="/"> Try again</a></p>
        `;
    }
};

/**
 * 删除指定ID的用户
 * @param {*} ctx 
 * @param {*} next 
 */
var fn_del = async(ctx, next) => {
    var id = ctx.params.id;
    var user = await Pet.findById(id);
    if (user) {
        var res = user.destroy({
            force: true
        });
        console.log('del success :' + res);
    }
    ctx.redirect('back');
};

module.exports = {
    'GET /': fn_index,
    'GET /reg': fn_reg,
    'POST /reg': fn_reg_post,
    'GET /del/:id': fn_del
}