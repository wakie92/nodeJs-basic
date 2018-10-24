const Sequelize = require('sequelize');
let sequelize = new Sequelize('example', 'root','admin',{
    host : 'localhost',
    port : 3306,
    dialect : 'mysql',
    operatorsAliases : false,

    pool: {
        max :5,
        min : 0,
        acquire : 30000,
        idle : 10000
    },
})
sequelize
    .authenticate()
    .then(() =>{
        console.log('connection has been extablished successfully.')
    })
    .catch(err =>{
        console.error('Unable to connect to the database : ', err)
    })

module.exports = sequelize;