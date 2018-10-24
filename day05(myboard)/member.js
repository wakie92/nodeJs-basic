var express = require('express');

var router = express.Router();
var db = require('./db')();
//회원가입페이지
router.get('/register', function(req,res){
    res.render('member/register');
})

//아이디 중복체크
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
module.exports.router = router;