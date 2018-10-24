/*
    http://localhost:10001/setCookie
    웹브라우져가 꺼지면 사라지는 정보
    http://localhost:10001/getCookie
*/

var http = require('http')

http.createServer(function(req,res){
    if(req.url =='/setCookie'){
        res.writeHead(200,{'content-type' : 'text/html;charset=utf-8',
                          'set-cookie' : ['id = hong; Max-Age = 60','age = 27']//60초까지 유지
                          })
        res.end('<h2>쿠키설정 완료</h2>')
    }else if(req.url =='/getCookie'){
        console.log(req.headers.cookie);
        res.writeHead(200,{'content-type' : 'text/html;charset=utf-8'});
        
        res.end('<h2>get cookie : ' + req.headers.cookie+' </h2>');
    }else if(req.url =='/removeCookie'){
        res.writeHead(200,{'content-type' : 'text/html;charset=utf-8',
                           'set-cookie' : ['id = hong; Max-Age = -1','age = 27; Max-Age = -1']
                          })
        res.end('<h2>쿠키삭제</h2>')
    }
}).listen(10001,function(){
    console.log('http://localhost:10001 구동중')
})