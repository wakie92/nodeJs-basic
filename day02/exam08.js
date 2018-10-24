var http = require('http');
var fs = require('fs');


http.createServer(function (request, response){
    console.log(__dirname);

    fs.readFile(__dirname + '/test.html', function(error, data){
       response.writeHead(200,{'content-type': 'text/html'});
        response.end(data);
    });

 /*   
  // response.end('<h2>hello</h2>')//단순문자열로 인식
   response.writeHead(200,{'content-type': 'text/html; charset =utf-8'}); //status200, MIME타입 검색
    response.end('<html>
                 <head></head>)//단순문자열로 인식
*/
}).listen(10001,function(){
    console.log('http://localhost:10001 서버 구동중');
});

