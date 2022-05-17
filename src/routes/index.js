const news = require('./news');
function route(http,connection) {
    http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var path = req.url
        var userid;
        var hasNumber = /\d/;
        if(hasNumber.test(path)) {
            var id = path.split('/')[2];
            userid = id;
        }
        news(req,res,connection,userid);
    }).listen(3000);
}
module.exports = route;