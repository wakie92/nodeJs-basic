//router

var express = require('express')
var server = express();


var newsRouter = require('./newsRouter.js');
server.use('/news',newsRouter.router);

var sportsRouter = express.Router();
server.use('/sports',sportsRouter)
/*
newsRouter.get('/main',function(req,res){
       res.send('<h1> 뉴스 메인페이지 입니다. </h1>')
})//  /news/main*/
sportsRouter.get('/main',function(req,res){
     res.send('<h1> 스포츠 메인페이지 입니다. </h1>')
})//  /sports/main

sportsRouter.get('/baseball',function(req,res){
     res.send('<h1> 스포츠 야구페이지 입니다. </h1>')
})//  /sports/main
sportsRouter.get('/football',function(req,res){
     res.send('<h1> 스포츠 축구페이지 입니다. </h1>')
})//  /sports/main
sportsRouter.get('/vollyball',function(req,res){
     res.send('<h1> 스포츠 배구페이지 입니다. </h1>')
})//  /sports/main

/*


server.get('/news/main',function(req,res){
    res.send('<h1> 뉴스 메인페이지 입니다. </h1>')
    
})

server.get('/news/photo',function(req,res){
    res.send('<h1> 뉴스 사진페이지 입니다. </h1>')
    
})

server.get('/news/it',function(req,res){
    res.send('<h1> 뉴스 it페이지 입니다. </h1>')
    
})
server.get('/sports/main',function(req,res){
    res.send('<h1> 스포츠 메인페이지 입니다. </h1>')
    
})

server.get('/sports/baseball',function(req,res){
    res.send('<h1> 스포츠 야구페이지 입니다. </h1>')
    
})

server.get('/sports/football',function(req,res){
    res.send('<h1> 스포츠 축구페이지 입니다. </h1>')
    
})


server.get('/sports/vollyball',function(req,res){
    res.send('<h1> 스포츠 배구페이지 입니다. </h1>')
    
})
*/




server.listen(10001,function(){
    console.log('http://localhost:10001 구동중')
})