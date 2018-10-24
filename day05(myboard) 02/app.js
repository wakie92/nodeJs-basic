var express = require('express');
var boardRouter = require('./board');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var multipart = require('connect-multiparty')
var app = express();

//화면모듈 설정(설정속성, 설정값);
app.set('view engine', 'jade');
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

//css, javascript 파일을 접근하기 위한 경로 설정
app.use(express.static(__dirname + '/public'))

//node.js/upload 폴더를 웹에서 직접 접근하도록 설정
app.use('/upload', express.static(__dirname + '/upload'));


//router 미들웨어 설정
app.use('/', require('./index').router);
app.use('/board',boardRouter.router);//url /board로 시작하는 것들은 전부다 boardRouter.router로 작동하게 설정
//app.use('/board',boardRouter);
//app.use('/board', require('./board'))
app.use('/member', require('./member').router);

app.listen(10001, function(){
    console.log('myboard 구성 중 \nhttp://localhost:10001 ');
})