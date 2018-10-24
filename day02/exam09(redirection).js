var http = require("http");
var fs = require("fs");
//redirection 
http.createServer(function(request, response){
    response.writeHead(302, {location : 'http://www.naver.com'}); //http status redirection에 관한 부분은 300번대
    response.end();
    
    
/*    fs.readFile(__dirname + '/test.html', function(error,data){
        response.writeHead(200,{'content-type': 'text/html'});
        response.end(data);
    })*/
}).listen(10001,function(){
    console.log('http://localhost:10001 서버 구동중');
});