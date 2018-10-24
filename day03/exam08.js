/*
    rest
    method + url
    1.get.(url,callback); 이러한 url로 get방식으로 왔다면
    2.post.(url,callback);
*/

var express  = require('express');

var server = express()

/* 이렇게 썼어야하는것을~ 
전부 get방식
server.use(function(req,res){
    switch(req.url){
        case '/' :
            res.send('/ 요청처리');
                break;
        case '/a':
            res.send('/a 요청처리');
                break;
        case '/b':
            res.send('/b 요청처리');
                break;
    }
})*/

server.get('/', function(req,res){
    res.send("url /의 응답결과")
})
server.get('/a', function(req,res){
    res.send("url /a의 응답결과")
})
server.get('/b', function(req,res){
    res.send("url /b의 응답결과")
})
server.get('/*', function(req,res){
    res.status(400).send("<h1>File not found</h1>")
    res.send("url /b의 응답결과")
})



server.listen(10001, function(){
    console.log("http://localhost:10001 구동중")
})