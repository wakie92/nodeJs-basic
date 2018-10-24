//express 외부모듈 npm install express
/*
    response.send();
    response.json();
    response.jsonp();
    response.send();
*/
var http = require('http')
var express = require('express');

//서버생성
var server = express();

server.use(function(req,res){
    //요청응답하는 것을 따로 만듬
    //10001번 포트를 통해 오는 모든 요청연결을 담당.
    res.writeHead(200, {'content-type' : 'text/html;charset=utf-8'})
    console.log('요청 연결...');
    
    res.end("<h1>요청처리완료</h1>");
});
/*

//서버실행
server.listen(10001,function(){
    console.log('http://localhost:10001 서버 구동중')
    
})

*/

http.createServer(server).listen(10001,function(){
    console.log('서버구동중');
})