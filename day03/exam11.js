//router

var express = require('express')
var server = express();
var newsRouter = require('./newsRouter.js');
var sportsRouter = require('./sportsRouter.js');


server.use('/news',newsRouter.router1);
server.use('/sports',sportsRouter.router1)


server.listen(10001,function(){
    console.log('http://localhost:10001 구동중')
})