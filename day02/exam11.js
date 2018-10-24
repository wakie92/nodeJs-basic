var http = require('http');
var url = require('url');
var queryString = require('querystring');

http.createServer(function(request, response) {
    var method = request.method;
    console.log('호출방식 : ' + method);
    
    response.writeHead(200, {
        'content-type' : 'text/html; charset=utf-8'
    });
    
    if(method == 'GET') {
        // localhost:10001?id=hong
        /*
        var params = url.parse(request.url);
        console.log(params);
        console.log(params.query);
        paramObj = queryString.parse(params.query);
        console.log(paramObj);
        */
        var params = url.parse(request.url, true);
        console.log(params.query);
        var paramObj = params.query;
        
        var data = '';
        for(var key in paramObj) {
            data += key + ' : ' + paramObj[key] + '<br>';
        }
        
        response.end('<h2>GET방식 파라미터 정보</h2>' + data);
        
    } else if(method == 'POST') {
        // localhost:10001  (request body 숨겨 전달 id=hong)        
        request.on('data', function(params) {
            console.log('params : ' + params);
            var paramObj = queryString.parse(params + '');
            console.log(paramObj);
            
            var data = '';
            for(var key in paramObj) {
                data += key + ' : ' + paramObj[key] + '<br>';
            }

            response.end('<h2>POST방식 파라미터 정보</h2>' + data);
        });
    }
    
}).listen(10001, function() {
   console.log('http://localhost:10001 서버 구동...');
});

