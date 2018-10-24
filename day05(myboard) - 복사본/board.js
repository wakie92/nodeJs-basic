/*
    게시판 관련 router
    - 게시판 전체조회
    - 게시글 상세조회
    - 게시글 등록
    - 게시글 수정
    - 게시글 삭제
*/
var express = require('express');
//var fs = require('fs');
//var jade = require('jade');

var router = express.Router();

var db = require('./db')();



//전제 게시글 조회페이지
//방법4 db연결
router.get('/',function(req,res){
    var sql = 'select no, title, writer, date_format(reg_date,"%y-%m-%d") as reg_date';
    sql += ' from t_board ';
    sql += ' order by no desc';
    
    db.query(sql, function (error,result){
        //console.log(error);
        //console.log(result);
        res.render('board/list',{boardList : result});
    })
})
/*
//방법 3
router.get('/',function(req,res){
    res.render('board/list');//app.set('view engine','jade') , app.set('views',__dirname +'/views')설정을 했기에 가능
})*/
/*
방법2
router.get('/',function(req,res){
    res.render(__dirname +'/views/board/list');//app.set('view engine','jade')설정을 했기에 가능
})

*/
/*방법1
router.get('/', function(req,res){//10001:/board/ 이렇게 하겠다는 뜻
    rs.readFile(__dirname + '/views/board/list.jade', 'utf-8', functions(error,data){
                var fn  = jade.complie(data);
                res.send(fn());
                })
})*/

//새글 등록
router.get('/post', function(req,res){
    res.render('board/form',{
        data : {
            title : '등록',
            url  : 'board/post'
        }});
})

router.post('/post', function(req,res){//등록을 누른후의 작업
    console.log(req.body);
    var title = req.body.title;
    var writer = req.body.writer;
    var content = req.body.content;
    var file = req.files;
    var sql = 'insert into t_board(title, writer, content) values(?,?,?)';
    
  
    db.query(sql,[title,writer,content],function(error,result){
        res.redirect('/board')
    })
});

//상세게시글 조회
router.get('/:num',function(req,res){//  /:(임의의 이름) 정보를 받겠다.
    console.log(req.params);// ?뒤에 나오는것은 query, 지금과같은 형태는 parameter라고한다.
    var sql = 'select no, title, writer, content, view_cnt ';
        sql += " , date_format(reg_date, '%y-%m-%d')as reg_date "
        sql += ' from t_board';
        sql += ' where no = ? ';
    
    
    db.query(sql,[req.params.num],function(error,result){
        console.log(error);
        console.log(result);
        res.render('board/detail',{ board : result[0]})
    })
    
})

//게시물 삭제 Delete  http://localhost:10001/board/3
router.delete('/:no',function(req,res){
    var sql = ' delete from t_board ';
        sql += ' where no = ? ';
    db.query(sql,[req.params.no], function(error,result){
        res.send(result)
    }) 
})
//전체삭제
router.delete('/',function(req,res){
    var sql = ' delete from t_board ';
    db.query(sql, function(error,result){
        console.log(error);
        res.send(result)
    }) 
})

//게시물 수정
/*
    1. 수정할 게시물 조회(get)
    2. 화면에 수정할 게시물을 출력(get)
    3. 사용자 입력한 데이터로 게시물 수정(put, post)
*/
router.get('/post/:no',function(req,res){
    var sql = " select title, writer, content ";
    sql += " from t_board ";
    sql += " where no = ? "
    
    db.query(sql,[req.params.no], function(error, results){
        console.log(error)
        console.log(results);
        res.render('board/form', {data : {
                title : '수정',
                url : '/board/' + req.params.no//의문
        }})
    })
    console.log('게시물 수정 get 호출')
})

//수정한 데이터로 게시물 수정
router.post('/:no',function(req,res){
    
    var sql  = "update t_board";
        sql += "   set title = ? , writer = ? , content = ? ";
        sql += " where no =? ";
    
    db.query(sql, [req.body.title,req.body.writer, req.body.content,req.params.no],function(error, result){
        res.redirect('/board/' + req.params.no);
    })
})
exports.router = router;
//module.exports = router;

