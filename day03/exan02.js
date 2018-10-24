var fs = require('fs');
var http = require('http');
var ejs = require('ejs');

http.createServer(function(req,res){
    fs.readFile(__dirname+'/exam02.ejs', function(error, data){
       res.writeHead(200,{'content-type' : 'text/html;charset=utf-8'})
        res.end(ejs.render(data,{
            name :'홍길'
        }));
    });
    
    
}).listen(10001, function(){
    console.log('http://localhost:10001 서버 구동중')
})