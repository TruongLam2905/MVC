const fs = require("fs");
const qs = require('querystring');
const path = require('path');
const db = require('../../config/database');
const accounts = require('../models/Account');
const Sequelize = require('sequelize');
const sequelize = require('../../config/database').sequelize;
// console.log(db.dbContext.models.Account);
const userCre = db.dbContext.models.Account;
// Bring in Model
class NewController {
    show(res,input) {
        res.write(fs.readFileSync(input));
        res.end();
    }
    createPost(req,res,connection) {
        let body = ''
            req.on('data', function(data) {
                body += data
            })
            console.log(body);
            req.on('end', async function() {
                let postData = await qs.parse(body);
                var user =  postData.username;
                var pass =  postData.password;
                var display = postData.displayname;
                var user = {
                    username: user,
                    password: pass,
                    displayname: display
                }
                let {username, password, displayname} = user;
                var acc = userCre.create({
                    username: username,
                    password: password,
                    displayname: displayname
                });
                console.log(acc);
                // acc.save();
                // connection.query("INSERT INTO account(username,password,displayname) VALUES(?, ?, ?)",[user,pass,display], function (err, result) {
                //     if (err) throw err;
                //     console.log("Thêm bản ghi thành công !!!");
                //     console.log(result)
                // });
                res.write(`Full Name: ${postData.username} <br>
                Password: ${postData.password}<br>
                Displayname: ${postData.displayname}`) 
                
                //Kết thúc phản hồi
                res.end();
            })
    }
    delete(req,res,userid,connection) {
        console.log(userid);
        userCre.destroy({
            where: {
                id: userid
            }
        });
        // var sql = "delete from account where id = "+ userid +"";
        // connection.query(sql, async function(err,data){
        //         if (err) throw err;
        //         console.log(" record(s) updated");
        // })
        res.write("Delete successfully!");
    }
    editPost(req,res,userid,connection) {
        let body = ''
            req.on('data', async function(data) {
                body += await data
            })
            console.log(body) 
            
            req.on('end', async function() {
                //phân tích Body
                let postData = await qs.parse(body);
                var user =  postData.username;
                var pass =  postData.password;
                var display = postData.displayname;
                userCre.update({username: user, password: pass, displayname: display}, {
                    where: {
                        id: userid
                    }
                })
                // var sql = `update accounts set username = '${user}', password = '${pass}', displayname = '${display}' where id = '${userid}'`;
                // con.query(sql,function (err, result) {
                //     if (err) throw err;
                //     console.log("Thêm bản ghi thành công !!!");
                //     console.log(result)
                // });
                res.write('Update done!') 
                res.end();
            })
    }
    listApi(req,res,connection) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const users = userCre.findAll().then(result =>{
            res.write(JSON.stringify(result).trim());
            res.end();
        }).catch(err => {
            console.log(err);
        })
        // console.log(users);
        // var sql = "select id,username,password,displayname from accounts";
        // connection.query(sql, function(err,result){
        //     if (err) {
        //         throw err;
        //     }                
        //     res.writeHead(200, {'Content-Type': 'application/json'});
        // })
    }
    detailApi(req,res,connection,id) {
        const user = userCre.findAll({
            where: {
                id: id
            }
        }).then(result => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            
            console.log(JSON.stringify(result).trim());
            res.write(JSON.stringify(result).trim());
            res.end();
        }).catch(err => {
            console.log(err);
        })
        // var sql = "select id,username,password,displayname from accounts where id = "+ id +"";
        // connection.query(sql, function(err,result){
        //     if (err) {
        //         throw err;
        //     }                
        //     // console.log(JSON.stringify(result).trim());
        //     res.writeHead(200, {'Content-Type': 'application/json'});
            
        //     console.log(JSON.stringify(result).trim());
        //     res.write(JSON.stringify(result).trim());
        //     res.end();
        // })
    }
}

module.exports = new NewController;