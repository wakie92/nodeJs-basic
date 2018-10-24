var express = require('express');
var bodyParser = require('body-parser');//post 방식은 url에서 넘어오는것이 아니고 body에 숨겨져서 넘어오기때문에 bodyparser가 필요함
var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({
    extend :true
}));//bodyparser를 쓴다고 선언  ==<form enctype = "application/x-www.urlencoded

app.get('/login', function(req,res){
   fs.readFile(__dirname+'/login.html', function(error,data){
     if(error){
         console.log('error');
     }else{
         /*
         res.writeHead(200,{
             'content-type' : 'text/html;charset=utf-8'
         })
         res.end(data);
*/   
         res.send(data.toString());//객체가 아니라 문자열로 보여줘라
     }  
   }); 
    
})

/*get방식
app.get('/',function(req,res){
    var id = req.query.id;
    res.send('id : ' + id);
})
*/

app.post('/login', function(req,res){
    
    res.send(req.body.id);
});

app.listen(10001,function(){
  console.log('http://localhost:10001 서버 구동중' )  
})