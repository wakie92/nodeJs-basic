var express = require('express')

var router = express.Router();

router.get('/main',function(req,res){
     res.send('<h1> 스포츠 메인페이지 입니다. </h1>')
})//  /sports/main

router.get('/baseball',function(req,res){
     res.send('<h1> 스포츠 야구페이지 입니다. </h1>')
})//  /sports/main
router.get('/football',function(req,res){
     res.send('<h1> 스포츠 축구페이지 입니다. </h1>')
})//  /sports/main
router.get('/vollyball',function(req,res){
     res.send('<h1> 스포츠 배구페이지 입니다. </h1>')
})//  /sports/main

exports.router1 = router;