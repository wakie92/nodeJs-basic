var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
    secret : 'hello',
    resave :true,
    saveeUninitialized : true,
    cookie : {
        maxAge :1000  //저장기간 설정  ex) 로그인 10분 이나면 로그아웃되는 형식
    }
 /*   
    secret : true/false
    resave : true/false
    saveUninitialized :  true/false
 */   
}));//세션을 쓰겠다고 알려주는 코드(미들웨어)

app.get('/setSession',function(req,res){
   req.session.id = 'hong';
    res.send('<h2>세션추가</h2>');//버젼이 바뀌면서 session 정보를 볼수 없게됨. 그래도 저장은 되어있음.
})

app.get('/getSession',function(req,res){
    console.log(req.session.id)
    res.send(req.session);
})

app.listen(10001,function(){
    console.log("http://localhost:10001 서버 구동중")
})