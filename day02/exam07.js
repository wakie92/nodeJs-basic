/*
    http 모듈 : 웹서버 처리를 위한 모듈
    createServer()  : 서버객체를 생성
    listen(port)    : server 실행
    close()         : server 종료
   
   이벤트
   connection
   request        :client ㅇ청시
   close          :서버 종료시
*/
 var http = require('http');
    
 var server = http.createServer();
 
server.listen(10001, function(){
    console.log("http 로컬호스트 10001 서버 구동중")
});

server.on('connection',function(){
    console.log("connection : 클라이언트 연결이 감지되었습니다.")
})

server.on('request',function(){
    console.log('request : client의 요청이 발생 되었습니다.')
})

server.on('close',function(){
          console.log("close : 서버가 종료되었습니다.")
          })

setTimeout(function(){
    server.close(function(){
        console.log('closeFunc : 서버종료');
    })
},5000)