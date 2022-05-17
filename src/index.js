const http = require("http");
var fs = require("fs");
var async = require("async");
const qs = require('querystring');
const app = require('./routes');
const db = require('./app/models/Account');
const route = require('./routes/index');
const sequelize = require('/MVC/src/config/database').sequelize;
// const { result } = require("lodash");
//Hằng số chứa form HTML hiển thị ra trong trường hợp method là GET
var mysql = require('mysql');
//Khởi tao kết nối với MySQL Server
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "firstdatabase"
});
//Tiến hàng kết nối
con.connect(function(err) {
    if (err) throw err;
    console.log("Success")
    //Kết nôi thành công
});

// sequelize.sync({force: false}).then((result) => {
//     console.log('Done');
// })
// .catch((err) => {
//     console.log(err);
// })



route(http,con);


