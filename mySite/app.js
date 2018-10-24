var express = require('express');
var memberRouter = require('./member');
var bodyParser= require('body-parser');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname +'/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extented: true
}))

app.use('/member',memberRouter.router);
app.listen(10003,function(){
    console.log('mySite  구성중 \nhttp://localhost:10003')
})