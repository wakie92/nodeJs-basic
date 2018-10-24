//미들웨어  => 라우터 기능을 쓸때 가장 많이 사용한다. 순서가 중요하다. 

var express = require('express');

var server = express();


server.use(function(req,res,next){
    console.log('요청처리1');
    req.a = 10;
    next()// 다음것도 처리하라는 의미
})

server.use(function(req,res){
    console.log('응답처리');
    res.send('complete...' + req.a);
})


server.listen(10001, function(){
    console.log('서벅 구동중');
})