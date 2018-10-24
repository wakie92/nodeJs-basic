var express = require('express');

var server = express();

//localhost:10001/id=hong&age=25
server.use(function(req,res){
  
    
    var id= req.query.id;
    var age = req.query.id;
  
    var output = "<h1>id : "+id+"</h1>"
    output += "<h1>age : "+age+"</h1>"
  console.log(output);
    res.send(output);
    
    
}).listen(10001,function(){
    console.log('http://localhost:10001 가동중')
})
/*
var server = express();
//미들웨어  중간에 기능을 더 끼워넣는 일
server.use();*/