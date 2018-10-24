const sequelize = require('./sequelize');
const Sequelize = require('sequelize');
const Comment = require('./commentModel');

const Board = sequelize.define('boards', {

    no: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT
    },
    writer: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    reg_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    view_cnt: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
})
//foreignKey
Board.hasMany(Comment, {foreignKey: 'no'});
Comment.belongsTo(Board, {foreignKey: 'no'});

Board.sync()
    .then(() => {
        console.log('***** Board sync *****')
    })
    .catch(() => {
        console.log('***** Board sync *****')
    })
module.exports = Board;