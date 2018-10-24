var express  = require('express');
var fs = require('fs');
var mysql = require('mysql');
var ejs = require('ejs');//동적인화면구성을 위해서
var bodyParser =require('body-parser');
var session = require('express-session')
//데이터베이스 연결설정
var client = mysql.createConnection({
    user : 'hr',
    password :'hrhr',
    database :'mydb'
})

//서버생성
var app = express();

//body-parser 미들웨어 설정

app.use(bodyParser.urlencoded({
    extended : true
}));

//sessiton 미들웨어 설정
app.use(session({
    secret : 'board_session',
    resave :false,
    saveUninitialized : true
}))

//서버실행
app.listen(10001, function(){
    console.log('10001번 포트 서버 구동중')
})

//라우터 추가
//전체게시글 조회
app.get('/',function(req,res){
    fs.readFile(__dirname + '/list.html','utf-8',function(error,data){
        if(error){
            console.log(Error);
        }else{
            //데이터베이스에서 전체 게시글 조회
            var sql = 'select no, title, writer '
            sql += ", date_format(reg_date,'%y/%m/%d') as reg_date from t_board";
            
            client.query(sql, function(error,result){
                console.log(result)
                 res.send(ejs.render(data,{
                boardList : result //fs.readFile로 불러온 html에 ejs로 접근할수있는 key값  
            }));
            })
           
            //res.send(data.toString());
        }
    })
})

//새글 등록페이지
app.get('/insert',function(req,res){
    fs.readFile(__dirname +'/insert.html',function(error,data){
        res.send(data.toString());
    })
})

app.post('/insert', function(req,res){
    /*
        1. form에서 입력받은 제목 작성자 내용추출
        2. db(t_board)저장
        3. 등록완료 알림
    */
    //1단계
    var title = req.body.title;
    var writer = req.body.writer;
    var content = req.body.content;
    
   // console.log(title + ' ' + writer + ' ' + content);
    //2단계
    var sql = 'insert into t_board(title, writer, content)'
    sql += 'value(?,?,?)'//배열형태로 들어감.
    
   var db =  client.query(sql,[title,writer,content],function(error,result){
       //3단계
       res.redirect('/');
    });
 
})

//상세페이지 조회
/*
    1. url에서 조회할 게시물 번호 추출
    2. db에서 번호에 해당 게시물 조회
    3. detail.html에 출력
*/
app.get('/detail',function(req,res){
    //1단계
    var no = req.query.no;
    //3단계
    fs.readFile(__dirname + '/detail.html','utf-8', function(error,data){
        var sql = 'select no, title, writer, content, view_cnt';
            sql += '   , date_format(reg_date, "%Y-%m-%d")as reg_date';
            sql +=' from t_board ';
            sql +=' where no = ? ';
        client.query(sql,[no],function(error,result){
            console.log(error);
            console.log(result[0] + '----------------------');
            res.send(ejs.render(data,{ board : result[0]}));//0번 한개의 데이터
        })
        //  res.send(data.toString());
    })
 
})

app.get('/login', function(req,res){
    fs.readFile(__dirname +'/login.html', 'utf-8', function(error, data){
       
        res.send(data.toString());
    })
})
   
app.post('/login', function(request, response) {
//    console.log(request.body);
    
    var sql =  'select * from t_member ';
        sql += ' where id = ? and password = ? ';
    
    client.query(sql, 
                 [request.body.id, request.body.password], 
                 function(error, results) {

//        console.log(results);
        
        if(results.length == 1) {
            
            // 세션 설정
            request.session.ids = results[0].id;
            request.session.user = {
                id : results[0].id,
                password : results[0].password,
                type : results[0].type
            };
            console.log(request.session);
            response.send("<h2>로그인 성공</h2>");
        } else {
            response.send("<h2>로그인 실패</h2>");
        }
        
    });

});




