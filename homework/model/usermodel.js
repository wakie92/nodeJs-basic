const sequliezer = require('./sequelize');
const Sequelize = require('sequelize');
const Board = require('./boardModel');

const User = sequliezer.define('users',{
    writer : {
        type : Sequelize.STRING,
        primaryKey : true
    }
},{
    timestamps :false
})
 
User.hasMany(Board,{
    foreignKey : 'writer'
});
Board.belongsTo(User,{
    foreignKey : 'writer'
}) 

User.sync()
    .then(() => {
        console.log("***** User sync *****")
    })
    .catch(() => {
        console.log("***** User sync *****")
    })


module.exports = User;