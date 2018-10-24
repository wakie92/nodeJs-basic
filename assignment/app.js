var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');

//데이터베이스 연결설정
var client = mysql.createConnection({
    user : 'hr',
    password : 'hrhr',
    database : 'mydb'
});

//서버생성
var app = express();

//body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({
    extended : true
}))

//session 미들웨어 설정
app.use(session({
    secret : 'board _session',
    resave : false,
    saveUninitialized: true
}));

//서버실행
app.listen(10001, function(){
    console.log('10001번 포트 서버 구동중');
});


//Router 추가
//전체게시글 조회
app.get('/', function(req,res){
    fs.readFile(__dirname + '/memberList.html','utf-8',function(error,data){
        if(error){
            console.log(error);
        }else{
            //데이터베이스에서 전체 게시글 조회
            var sql = 'select id, name, email_id, email_domain '
            sql += " from t_member ";
            client.query(sql,function(error, result){
                console.log(error);
                console.log(result)
                res.send(ejs.render(data,{
                    memberList : result
                }));
            })
        }
    })
})

app.get('/register',function(req,res){
    fs.readFile(__dirname + '/register.html', function(error,data){
        res.send(data.toString());
    })
})


app.post('/register',function(req,res){
     /*
        1. form에서 입력받은 제목 작성자 내용추출
        2. db(t_board)저장
        3. 등록완료 알림
    */
    console.log(req.body);
    var id = req.body.id;
    var name= req.body.name;
    var password = req.body.password;
    var email_id = req.body.email_id;
    var email_domain = req.body.email_domain;
    var tel1 = req.body.tel1;
    var tel2 = req.body.tel2;
    var tel3 = req.body.tel3;
    var post = req.body.post;
    var basic_addr = req.body.basic_addr;
    var detail_addr = req.body.detail_addr;
    
    var sql = 'insert into t_member(id,name,password,email_id,email_domain,tel1,tel2,tel3,post,basic_addr,detail_addr) '
    sql += 'values(?,?,?,?,?,?,?,?,?,?,?)'
 
    var db = client.query(sql, [id,name,password,email_id,email_domain,tel1,tel2,tel3,post,basic_addr,detail_addr],
                         function(error,result){
        console.log(error);
        console.log(result);
                          res.redirect('/');
                          })
})


app.get('/detailInfo',function(req,res){
    var id = req.query.id;
    
    fs.readFile(__dirname + '/detailInfo.html','utf-8',function(error,data){
        var sql = 'select * from t_member ';
        sql += ' where id = ? ';
        
        client.query(sql,[id],function(error,result){
            console.log(error);
            console.log(result);
            res.send(ejs.render(data,{ member : result[0] }));
        })
    })
})



























