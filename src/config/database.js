const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
// const sequelize = new Sequelize();
const dbConfig = new Sequelize("firstdatabase","root","", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    storage: "SOME_DB_PATH"
});

dbConfig.sync({force: false}).then((result) => {
    console.log('OK');
})
.catch((err) => {
    console.log(err);
})

// fs
//   .readdirSync(__dirname)
//   .filter((file) =>
//     file !== 'index.js'
//   )
//   .forEach((file) => {
//     //-----------------------THIS PART HERE-----------------------
//     /**
//      * Choose any one of the below definition for model variable 
//      */
//     // for individual model files having `export default (sequelize, DataTypes) => {`    
//     // const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes); 
//     // for individual model files having `module.exports = (sequelize, DataTypes) => {`    
//     const model = require(path.join(__dirname, file))(dbConfig, Sequelize);

//     db[model.name] = model;
//     //----------------------------------------------------------
//   })

var db = {};
db.dbContext = dbConfig;
db.Sequelize = Sequelize;
// db.sequelize = sequelize;
module.exports = db;