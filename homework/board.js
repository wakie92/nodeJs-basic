var express = require('express')
var router = express.Router();
const Board = require('./model/boardModel');
const Comment = require('./model/commentModel');
const User = require('./model/usermodel');
//list조회
router.get('/', function(req, res, next){
    console.log(11111);
    Board.findAll({
            attributes: ['no','title', 'writer', 'reg_date', 'view_cnt'],
            order: [['reg_date','DESC']]

    }).then(data =>{
        //console.log(data);
        res.render('board/list', {
            boards : data
        })
    })
    .catch(err =>{
        console.log('list' + err);
    })
})

// router.get('/:writer', function(req,res){
//     console.log(req.params.writer)
//     Board.findAll({
//         attributes: ['no','title', 'writer', 'reg_date', 'view_cnt'],
//         order: [['reg_date','DESC']],
//         include : [{
//             model : User,
//             required : true
//         }]
//     }).then(data =>{
//         res.render('board/list',{
//             boards : data
//         })
//     }).catch(err =>{
//         console.log(err);
//     })
// })
//새글 등록
router.get('/post', function(req,res,nex){

    res.render('board/write.jade')
})
router.post('/post', function(req,res){
    const { title, content, writer } = req.body;

    Board.build({
        title : title,
        writer : writer,
        content :  content
    }).save().then(() => res.redirect('/board'))
})
//상세 조회
router.get('/:no', function(req,res){
    let {no} =req.params;
    // SELECT `boards`.`no`, `boards`.`title`, `boards`.`writer`, `boards`.`reg_date`, `boards`.`view_cnt`, `comments`.`commentNo` AS `comments.commentNo`,
    //  `comments`.`no` AS `comments.no`, `comments`.`writer` AS `comments.writer`, `comments`.`comment` AS `comments.comment`, 
    //  `comments`.`reg_date` AS `comments.reg_date`
    //  FROM `boards` AS `boards` LEFT OUTER JOIN `comments` AS `comments` ON `boards`.`no` = `comments`.`no` WHERE `boards`.`no` = '1';
    // let sql = '';
    // sql += ' select b.no, b.title, b.writer, b.reg_date, b.view_cnt, c.no, c.writer, c.comment ';
    // sql += ' from boards as b left outer join comments as c on b.no = c.no ';
    // sql += ' where b.no = :no '
    // Board.sequelize.query(sql, {replacements : req.params})
    //     .then(result =>{
    //         console.log(result[0])
    //         res.send(result[0])
    //     })
    Board.findOne({
        attributes: ['no','title', 'writer', 'reg_date', 'view_cnt'],
        where : {
                    no : no
                },
        include : [{
                    model : Comment,
                  }]
    }).then(data =>{
        console.log(data)
        res.send(data)
        res.render('board/detail',{
            board :data
        })
    }).catch(err =>{
        console.log(err);
    })
    
})

//삭제
 router.delete('/:no', function(req,res){
    console.log(req.params);
    Board.destroy({
        where: {
                    no : req.params.no
                }
    }).then((data)=>{
       res.send();    
    }).catch(err => {
        console.log(err)
    })
}) 

//댓글쓰기
router.post('/:no',function(req,res){
    console.log(req.body)
   const { reple, writer, boardNo }  = req.body
    Comment.build({
        comment : reple,
        writer : writer,
        no  :  boardNo
    }).save().then(reple =>{
        res.send(reple);
    })
})



module.exports = router;
