var http = require("http");
var url = require("url");
/*
    http://localhost:10001/a접속
    http://localhost:10001/b접속
    
*/
http.createServer(function(request,response){
    //http://localhost:10001/a?id=hong
    console.log(request.url);//  /a?id=hong 추출
    console.log(url.parse(request.url).pathname);//url중 파라미터를 제외한것 /a 추출
    
    response.writeHead(200,{'content-type' : 'text/html; charset=utf-8'})
    
    if(request.url =='/'){
       response.end('<h1>메인페이지입니다.</h1>')
    }else{
        response.end('<h1>url'+ request.url+ '</h1>')
    }

}).listen(10001, function(){
    console.log('http://localhost:10001 서버가동중 ...');
})