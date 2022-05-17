const newsController = require('../app/controllers/NewController');

async function news(req,res,connection,userid) {
    if ((req.url === '/index' || req.url === '/') && req.method === 'GET') {
        await newsController.show(res,'./views/index.html');
    } else if(req.url === '/create') {
        if(req.method === 'GET') {
            await newsController.show(res,'./views/create.html');
        }
        if(req.method === 'POST') {
            await newsController.createPost(req,res,connection);
        }
    } else if(req.url === '/api/list') {

        await newsController.listApi(req,res,connection);

    } else if(req.url === '/api/'+ userid +'' && req.method === 'GET') {

        await newsController.detailApi(req,res,connection,userid)

    } else if(req.url === '/delete/'+ userid +'' && req.method === 'GET') {

        await newsController.delete(req,res,userid,connection);

    } else if(req.url === '/update/'+ userid +'') {
        if(req.method === 'GET') {

            await newsController.show(res,'./views/update.html');

        }
        if(req.method === 'POST') {

            await newsController.editPost(req,res,userid,connection);

        }
    }
    else {

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found!' }));
        
    }
}

module.exports = news;