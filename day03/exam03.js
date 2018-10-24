var http = require('http');
var jade = require('jade');
var fs = require('fs')


http.createServer(function(req,res){
    fs.readFile(__dirname+'/exam03.jade','utf-8',function(error,data){
        var fn = jade.compile(data);
        res.writeHead(200, {'content-type' : 'text/html;charset=utf-8'})
        res.end(fn({
            id :  'hong'
        }));
    })
}).listen(10001, function(){
    console.log('http://localhost:10001 구동중')
})