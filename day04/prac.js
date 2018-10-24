var express = require('express');
var cookieparser = require('cookie-parser');

var app = express();

app.use(cookieparser());

app.get('/setCookie', function(req,res){
    res.cookie('id', 'hong',{
        maxAge : 6*1000
    });
    res.cookie('user',{
        name : '이창훈',
        age : '27'
    });
    res.redirect('/getCookie');
})

app.get('/getCookie',function(req,res){
    var cookies = req.cookies;
    var id = cookies.id;
    var user = cookies.user;
    
    var output= `<h2>쿠키에 저장된 정보</h2>
                id  : ${id}<br>
                user name  : ${user.name}<br>
                user aget  : ${user.age}`;
    res.send(output);
})



app.listen(10001,function(){
    console.log('10001번포트 구동중');
})