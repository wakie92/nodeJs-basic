const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const Comment = sequelize.define('comments', {
    commentNo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    no: {
        type: Sequelize.INTEGER,
    },
    writer: {
        type: Sequelize.STRING
    },
    comment: {
        type: Sequelize.TEXT
    },
    reg_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    }

}, {
    timestamps: false
})

Comment.sync()
    .then(() => {
        console.log("***** Comment sync *****")
    })
    .catch(() => {
        console.log("***** Comment sync")
    })


module.exports = Comment;