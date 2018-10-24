/*
    게시판 관련 router
    - 게시판 전체조회
    - 게시글 상세조회
    - 게시글 등록
    - 게시글 수정
    - 게시글 삭제
    - 댓글 등록
*/
var express = require('express');
var fs = require('fs');
//var jade = require('jade');

var router = express.Router();

var db = require('./db')();



//전제 게시글 조회페이지
//방법4 db연결
router.get('/',function(req,res){
    console.log('user');
    console.log(req.session.user);
    //console.log(req.session);
    
    var sql = 'select no, title, writer, view_cnt, date_format(reg_date,"%y-%m-%d") as reg_date';
    sql += ' from t_board ';
    sql += ' order by no desc';
    
    db.query(sql, function (error,result){
        //console.log(error);
        
        res.render('board/list',{boardList : result, user : req.session.user});
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
    res.render('board/write',{
        user : req.session.user
    });
})

router.post('/post', function(req,res){//등록을 누른후의 작업
    console.log(req.body);
    console.log(req.files);
    var title = req.body.title;
    var writer = req.body.writer;
    var content = req.body.content;
    //파일첨부
    var file01 = req.files.file01;
   
    //db저장(tboard)
    var sql = 'insert into t_board(title, writer, content) values(?,?,?)';
    
     db.query(sql,[title,writer,content],function(error,result){
        if(error)
            throw error;
    })
   
    //db저장(t_board_file)
    if(file01.name){
        var oriName = file01.name;
        var index = file01.path.indexOf('upload')-1;
        var saveName = file01.path.substring(index);
        var fileSize = file01.size;
        
        //last_insert_id() : 가장 최근에 insert된 auto_increment번호를 가져옴
        sql = 'insert into t_board_file( '
        sql += '  board_no, file_ori_name, file_save_name, file_size) ';
        sql += 'values (last_insert_id(), ?, ?, ? )'
        
        db.query(sql,[oriName, saveName, fileSize], function(error, result){
           if(error) throw error; 
        });
    }else {
        //upload에 첨부파일이 없을때 생기는 파일 삭제(unlink)
        fs.unlink(file01.path, function(error){
            console.log(error);
        })
    }
    
   res.redirect('/')
});

//댓글 등록
router.post('/:no', function(req,res){
    
    console.log(req.session.user.id);
    console.log(req.body.reple)//댓글입력창
    var id = req.session.user.id;
    var reple = req.body.reple;
    
    var sql  = "insert into t_comment(c_id, c_board_no, comments) values(?, ?, ?)";

    db.query(sql, [id,req.params.no, reple],  function(error,result){
        if(error)
            throw error;
    })

})
router.get('/',function(req,res){
    console.log('user');
    console.log(req.session.user);
    //console.log(req.session);
    
    var sql = 'select no, title, writer, view_cnt, date_format(reg_date,"%y-%m-%d") as reg_date';
    sql += ' from t_board ';
    sql += ' order by no desc';
    
    db.query(sql, function (error,result){
        //console.log(error);
        
        res.render('board/list',{boardList : result, user : req.session.user});
    })
})
//댓글 게시 json으로
/*
router.get('/:no', function(req,res){
    var board = results[0];
        var sql = 'select no, date_format(reg_date, "%Y.%m.%d %h:%m")as reg_date, c_id, comments, c_board_no ' 
            sql += "  from t_comment";
            sql += " where c_board_no = ?" 
    
            info :  result,
});
*/

// 상세게시글 조회 + left outer join(join을하면 db.query를 두번 사용하지않아도됨)
router.get('/:no', function(req, res) {
    if(!req.session.user) {
        res.redirect("/login");
        return;
    }
    var c_result = [];
    var c_sql = 'select no, date_format(reg_date, "%Y.%m.%d %h:%m")as reg_date, c_id, comments, c_board_no ' ;
        c_sql += "  from t_comment";
        c_sql += " where c_board_no = ?" 
    db.query(c_sql, [req.params.no], function (error, result){
        console.log(c_result);
        c_result = result;
    })
    

    var sql  = 'select tb.no, tb.title, tb.writer, tb.content, tb.view_cnt ';
        sql += '     , date_format(tb.reg_date, "%Y-%m-%d") as reg_date ';
        sql += '     , tbf.file_ori_name, tbf.file_save_name, tbf.file_size ';
        sql += '  from t_board tb left outer join t_board_file tbf ';
        sql += '    on tb.no = tbf.board_no ';
        sql += ' where tb.no = ? ';
    
   db.query(sql, [req.params.no], function (error, results) {
        console.log(c_result);
           res.render('board/detail2', {
             info :  c_result,
             user: req.session.user,
             board: results[0]
            })
        });
});

/* 
router.get('/:no', function(req, res) {
    if(!req.session.user) {
        res.redirect("/login");
        return;
    }

    var sql  = 'select tb.no, tb.title, tb.writer, tb.content, tb.view_cnt ';
        sql += '     , date_format(tb.reg_date, "%Y-%m-%d") as reg_date ';
        sql += '     , tbf.file_ori_name, tbf.file_save_name, tbf.file_size ';
        sql += '  from t_board tb left outer join t_board_file tbf ';
        sql += '    on tb.no = tbf.board_no ';
        sql += ' where tb.no = ? ';
    
   db.query(sql, [req.params.no], function (error, results) {
           res.render('board/detail2', {
             user: req.session.user,
             board: results[0]
            })
        });
});
 */

/*
//상세게시글 조회 +  조회수 늘리기 + 첨부파일조회
router.get('/:num',function(req,res){//  /:(임의의 이름) 정보를 받겠다.
    console.log(req.params);// ?뒤에 나오는것은 query, 지금과같은 형태는 parameter라고한다.
    if(!req.session.user){
        res.redirect('/login')
        return;//else 안쓰기위해
        
    }
    //조회수 늘리기
    db.query('update t_board set view_cnt = view_cnt + 1 where no = ?',[req.params.num],function(error,result){
        console.log(error);
        console.log(result);
    })

    var sql = 'select no, title, writer, content, view_cnt ';
        sql += " , date_format(reg_date, '%y-%m-%d')as reg_date "
        sql += ' from t_board';
        sql += ' where no = ? ';

    db.query(sql,[req.params.num,req.params.num],function(error,results){
        var board = results[0];
        
         //첨부파일조회
        var sql  = 'select * from t_board_file ';
            sql += ' where board_no = ? ';
            var data = ''
        db.query(sql, [req.params.num], function(error, results){
            
            res.render('board/detail', {
                files : results[0],
                board : board
            });
        
        })
        
    })
    
})
*/

/*
// 상세게시글 조회  + 첨부파일 여러개
router.get('/:no', function(request, response) {
    if(!request.session.user) {
        response.redirect("/login");
        return;
    }
    
//    console.log(request.params);
        
    var sql  = 'select no, title, writer, content, view_cnt ';
        sql += '     , date_format(reg_date, "%Y-%m-%d") as reg_date '
        sql += '  from t_board ';
        sql += ' where no = ?;';
        sql += 'select * from t_board_file ';
        sql += ' where board_no = ?;';
    
   db.query(sql, [request.params.no, request.params.no], function(error, results) {
      // console.log(results);
       response.render('board/detail', {
           board : results[0][0],
           files : results[1][0]
       });
   });
    
});*/


//게시물 삭제 Delete  http://localhost:10001/board/3
router.delete('/:no',function(req,res){
   
     var sql  = "select file_save_name from t_board_file ";
         sql += ' where board_no = ? ';
    db.query(sql, [req.params.no], function(error, result){
        console.log(error)
        if(result.length != 0){//파일첨부가 되어있으면
            var name = result[0].file_save_name;
            fs.unlink(__dirname + name ,function(error){});
        }
    });
/*    
    mysql on delete cascade 설정하면 이코드 필요없음
    //t_board_file 첨부파일 삭제
    var sql = ' delete from t_board_file ';
        sql += ' where board_no = ? ';
    db.query(sql,[req.params.no], function(error,result){
        
    }) 
    */
    // t_board 게시물 삭제
    var sql =  'delete from t_board ';
        sql +=  ' where no = ? ';
    db.query(sql, [req.params.no], function(error, result) {
        res.send(result.length);
    });

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
        res.render('board/update', {board : results[0], no : req.params.no})
    })
   
})

//수정한 데이터로 게시물 수정
router.post('/:no',function(req,res){
    
    console.log(req.params);
    var sql  = "update t_board";
        sql += "   set title = ?  , content = ? ";
        sql += " where no =? ";
    
    db.query(sql, [req.body.title,req.body.content,req.params.no],function(error, result){
        res.redirect('/board/' + req.params.no);
    })
})




exports.router = router;
//module.exports = router;

