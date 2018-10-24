var express = require('express')

var server = express();

server.use(function(req,res){
    console.log(req.headers.host)
    var output = [];
    for(var i = 0; i<3; i++){
        output.push({
        no : i*10,
        id : '길동' + i
        })   
    }
    
   // res.send(output);
    //res.json(output);
    //res.redirect('http://www.daum.net');
    //res.sendStatus(500);
    res.status(404).send('<h1>file not found</h1>')
   /* res.writeHead(200,{'content-type' : 'text/html;charset=utf-8'});
    res.end(JSON.stringify(output));*/
})

server.listen('10001',function(){
    console.log("http://localhost:10001 구동중")
})