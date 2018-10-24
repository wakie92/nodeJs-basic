var express = require('express');
var boardRouter = require('./board');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var multipart = require('connect-multiparty');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs  = require('fs');
var app = express();

//화면모듈 설정(설정속성, 설정값);
app.set('view engine', 'jade');
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:4200");
    response.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    response.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response.header("Access-Control-Allow-Credentials", true);
    next();
});

app.set('views',__dirname +'/views');
//app.set('views', path.join(__dirname,'view')

//session 설정
app.use(session({
    secret : 'myboard',
    resave : 'false',
    saveUninitialized : true
}))

//post 방식의 bodyparser 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended :true
}));
//미들웨어의 방식으로 이 뒤의 router에도 bodyparser가 적용되기때문에 board.js에 따로 require할 필요없다.

//multipart 미들웨어
app.use(multipart({
    uploadDir : __dirname + '/upload'
}))

//morgan설정(log남기기)//method방식의 url과 date를 남기겠다는 뜻
//app.use(logger(':method :url :date'));
app.use(logger({
    //format :':method :url :date :remote-addr',
    formate : 'dev',
    stream : fs.createWriteStream(__dirname + '/app.log', {'flags' : 'w'})
}))
//쿠키설정
app.use(cookieParser());

//css, javascript
//파일을 접근하기 위한 경로 설정
app.use(express.static(__dirname + '/public'))

//node.js/upload 폴더를 웹에서 직접 접근하도록 설정
app.use('/upload', express.static(__dirname + '/upload'));


//router 미들웨어 설정
app.use('/', require('./index').router);
app.use('/board',boardRouter.router);//url /board로 시작하는 것들은 전부다 boardRouter.router로 작동하게 설정
//app.use('/board',boardRouter);
//app.use('/board', require('./board'))
app.use('/member', require('./member').router);
app.use('/ajax',require('./boardAjax'));


app.listen(10001, function(){
    console.log('myboard 구성 중 \nhttp://localhost:10001 ');
})