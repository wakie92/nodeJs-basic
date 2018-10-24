var mysql = require('mysql');

//데이터를 가지러 가는 시간을 단축하기 위하여 미리 접속 데이터를 queue방식이나 stack방식으로 준비해 두는것
var pool = mysql.createPool({
    user :'hr',
    password :'hrhr',
    database :'mydb'
});

pool.getConnection(function(error,conn){  //conn가지고 다룬다. 내부적으로 배열을 가지고있음.
    if(error){
        conn.release();
        console.log(error);
        process.exit(0);
    }else{
        console.log(conn.threadId);
        
        conn.query('select *from t_test',function(error,results){
            if(error){
                conn.release();
                process.exit(0);
            }
             conn.release();
            console.log(results)
        })
    }
})
