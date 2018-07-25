/**
 * 功能测试
 */

const 
    request = require('supertest'),
    app = require('../app');


describe("#test koa app", () => {
    
    let server = app.listen(9900);

    describe('#test server', async () => {
        
        it('#test GET /', async () => {
            let res = await request(server)
                .get('/test/')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, world!</h1>');
        });

        it('#test GET /test/path/Bob', async () => {
            let res = await request(server)
                .get('/test/path/Bob')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, Bob</h1>');
        })
    });
});
      