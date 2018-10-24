var express = require('express');

var server = express();

var router = express.Router();

router.get('/main',function(req,res){
    res.send('<h1>news main페이지 입니다</h1>')
    
});

router.get('/news/photo',function(req,res){
    res.send('<h1> 뉴스 사진페이지 입니다. </h1>')
    
})

router.get('/news/it',function(req,res){
    res.send('<h1> 뉴스 it페이지 입니다. </h1>')
    
})
exports.router1 = router;