var express = require('express');

var router = express.Router();
var db = require('./db')();

router.get('/', function(req, res) {
   res.render('index'); 
});



router.get('/login',function(req,res){
    //console.log('-------');
    //console.log(req.session.user);
    if(req.session.user){
        res.redirect('/board');
    }else{
        res.render('login/login')
    }
   
});
/*
    request.query
    request.params
    request.session
    request.cookie
    request.body
*/
//암댐



router.post('/login', function(req,res){
    var id = req.body.id;
    var password = req.body.password;
    
    var sql = "select id , password, type ";
    sql += " from t_member";
    sql += " where id = ? and password = ? ";
    
    db.query(sql, [id,password],function(error, result){
        console.log(error);
        console.log(result);
        if(result.length == 1){
            //로그인 성공
            //세션등록
            req.session.user = result[0];
            req.session.userId = result[0].id;//아이디 등록
            req.session.type = result[0].type;
            //console.log(req.session);
            
            res.redirect('/board')
        }else {
            //로그인 실패
            res.redirect('/login')
        }
    })
})
//여기서 로그인성공 후에 로그인정보를 유지하기위해 app.js에 session모듈 추가


router.get('/logout',function(req,res){
    //세션삭제
    req.session.destroy(); //세션을 삭제할때 쓰는 함수
    console.log('logout 호출');
    res.redirect('/board')
})


exports.router = router;