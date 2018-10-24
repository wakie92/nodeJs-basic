var http = require('http');
var fs = require('fs');


http.createServer(function(req,res){
    fs.readFile(__dirname + '/test.html',function(error,data){
        res.writeHead(200,{'content-type' : 'text/html'})
        res.end(data);
    })
    
}).listen(10001, function(){
    console.log('http://localhost:10001 서버 구동중');
})