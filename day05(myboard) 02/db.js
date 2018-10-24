var mysql = require('mysql');

module.exports = function(){
    
    var mydb = mysql.createConnection({
        user : 'hr',
        password : 'hrhr',
        database : 'mydb',
        host : 'localhost',
    });
    
    return mydb;
    
}