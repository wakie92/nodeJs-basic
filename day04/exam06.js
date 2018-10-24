/*
    mysql 접속
    mysql://localhost:3306/mydb
    hr@localhost/hrhr
*/

var mysql = require('mysql');
var client = mysql.createConnection({
    //user와 password는 반드시 필요
    host : 'localhost',
    database : 'mydb',
    port : 3306,
    user : 'hr',
    password : 'hrhr'
    
});

//console.log(client);
//커넥션풀방식을 사용하면 속도가 좀 빨라진다.

client.query('select *from t_test', function(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
    }
})