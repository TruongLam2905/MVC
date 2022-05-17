

const { Sequelize, DataTypes } = require('sequelize');
const db = require('/MVC/src/config/database'); // bug
const Account = db.dbContext.define('Account', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING
    },
    displayname: {
        type: DataTypes.STRING
    }
  }, {
      timestamps: false
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  // console.log(Account === sequelize.models.Account); // true
// const user =  Account.build({username: 'David',password: '123',displayname:'david'});
// console.log(user);
// user.save();
// console.log("Done");
module.exports = new Account;