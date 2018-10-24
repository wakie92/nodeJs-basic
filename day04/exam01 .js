var express = require('express');
var cookieparser = require('cookie-parser');

var app = express();

app.use(cookieparser());
/*
    cookie(key, value, option);
      key    : string
      value  : string, number, json, Array
      option : json
        path, maxAge, expires, secure
*/
app.get('/setCookie', function(request, response) {
    
    //response.cookie('id', 'hong');
    response.cookie('id', 'hong', {
        maxAge : 6 * 1000
    });
    response.cookie('user', {
        'name' : '홍길동',
        'age' : 30
    });
    //response.send('<h2>쿠키 저장완료 </h2>');
    response.redirect('/getCookie');
    
});

app.get('/getCookie', function(request, response) {
    var cookies = request.cookies;   // {id : 'hong'}
    var id = cookies.id;
    var user = cookies.user;
    
    var output = `<h2>쿠키에 저장된 정보</h2>
                  id : ${ id }<br>
                  user name : ${ user.name } age : ${ user.age }<br>`;
    
    //response.send(request.cookies);
    // response.send('쿠키에 저장된 id : ' + id);
    response.send(output);
});

app.listen(10001, function() {
   console.log('http://localhost:10001 서버 구동중');
});