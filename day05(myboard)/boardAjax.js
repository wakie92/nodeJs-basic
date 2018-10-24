var express = require('express');
var router = express.Router();
var db = require('./db')();

//전체게시글 조회
//localhost:10001/ajax


router.get('/', function(req,res){
    

    var sql = " select no, title, writer, content, view_cnt as viewCnt, ";
        sql +="  date_format(reg_date, '%Y-%m-%d')as regDate ";
        sql += " from t_board ";
        sql += " order by no desc ";

    db.query(sql, function(error, results){
        console.log(error);
       res.json(results); 
    });
})

router.get('/:no', function(req,res){
    
      var sql = " select no, title, writer, content, view_cnt as viewCnt, ";
        sql +="  date_format(reg_date, '%Y-%m-%d')as regDate ";
        sql += " from t_board ";
        sql += "  where no = ? "
    
    db.query(sql, [req.params.no], function(error, result){
        
        res.json(result[0]);
    });
});
//게시글 삭제
router.delete('/:no', function(req,res){
   var sql  = " delete from t_board where no= ?; ";
        sql += " select no, title, writer, content, view_cnt as viewCnt, ";
        sql +="  date_format(reg_date, '%Y-%m-%d')as regDate ";
        sql += " from t_board ";
        sql += " order by no desc; ";
    db.query(sql, [req.params.no], function(error, results){
        console.log("목록")
        console.log(results);
        console.log(results[1]);
        res.json(results[1]);
        //쿼리가 두개이기때문에 두번개의 배열 형태로 저장됨
    });
})
//게시글 등록
//새글 등록

router.post('/', function(req,res){//등록을 누른후의 작업
    console.log(req.body);
    var title = req.body.title;
    var writer = req.body.writer;
    var content = req.body.content;
      
    //db저장(tboard)
    var sql = 'insert into t_board(title, writer, content) values(?,?,?); ';
        sql += " select no, title, writer, content, view_cnt as viewCnt, ";
        sql += "  date_format(reg_date, '%Y-%m-%d')as regDate ";
        sql += " from t_board ";
        sql += " order by no desc; ";
    
     db.query(sql,[title,writer,content],function(error,results){
        //console.log(result);
         console.log("새글등록후" );
         console.log(results)
         res.json(results[1]);
         
    })
   
   /*
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
    }*/
    
});

//로그인
    
router.post('/login',function(req,res){
    var sql  = "select id, password, type from t_member  where id = ?  and password = ? ";
    
    db.query(sql, [req.body.id, req.body.password], function(error, result){
       console.log(result)
        res.json(result);
    })
})  


router.get('/mypage/:id', function(req,res){
   console.log('welcome id');
    console.log(req.params.id)
    var sql = 'select * from t_member ';
        sql += ' where id = ? ';
    db.query(sql, [req.params.id], function(error, results){
        console.log(results);
       
        res.json(results[0])
    })
        
})








module.exports = router;