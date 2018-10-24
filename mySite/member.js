var express = require('express');
//var fs = require('fs');
//var jade = require('jade')

var router = express.Router();
var db = require('./db')();



//명단 db에서 불러오기
router.get('/',function(req,res){
    var sql = 'select id, name, email_id, email_domain '
        sql += " from t_member ";
    db.query(sql,function(error,data){
        console.log(error);
        console.log(data);
        res.render('member/memberList',{memberList : data}); 
        //=> http://localhost:10003/member에 member/memberList.jade파일을 보내기
    })
})
//중복체크
router.get('/checkId/:id',function(req,res){
    var id = req.params.id
    var sql = "select * from t_member where id = ?";
    db.query(sql, [id], function(error,result){
        
       res.json({
            result : result.length == 0 ? '사용가능한아이디입니다.' : '이미 사용중인 아이디 입니다.'
        });
        console.log(result);
    })
    
})

router.post('/register',function(req,res){
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var password = req.body.password
    var email = [];
    email[0] = req.body.email.split('@')[0];
    email[1] = req.body.email.split('@')[1];
    var tel1 = req.body.tel1;
    var tel2 = req.body.tel2;
    var tel3 = req.body.tel3;
    var post = req.body.post;
    var basic_addr = req.body.basic_addr;
    var detail_addr = req.body.detail_addr;
    
    var sql = "insert into t_member(id, name, password, email_id ,email_domain, tel1, tel2, tel3, post, basic_addr, detail_addr)";
    sql += "values(?,?,?,?,?,?,?,?,?,?,?)";
    
    db.query(sql,[id, name, password, email[0], email[1], tel1, tel2, tel3, post, basic_addr, detail_addr], function(error, result){
        console.log(error)
        res.redirect('/member');
    })
})





router.get('/register', function(req,res){
  res.render('member/register'); 
})
exports.router = router;