var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multiparty = require('connect-multiparty');

var app = express();
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(multiparty({
    uploadDir : __dirname +'/upload'//설정되면 첨부된파일이 upload폴더에 들어간다.
    
}));

app.get('/upload',function(req,res){
    fs.readFile(__dirname + '/exam04.html', function(error,data){
        if(!error){
            res.send(data.toString());
        }
    })
})

app.post('/upload',function(req,res){
    console.log(req.body);
    console.log(req.files);
    //res.send(req.body);//이방식으로는 파일을 뽑아올수가없다.bodyparse는 json형태로 나와야 구별가능하다.
    var id = req.body.id;
    var orname = req.files.image.originalFilename;
    var saveName = req.files.image.path;
    var output = `'<h1>추출된 데이터 정보</h1>'
                    ID : ${id}<br>
                        사진 원본파일명 :${orname}<br>
                            저장파일명 : ${saveName}<br>`
    res.send(output);
})

app.listen(10001, function(){
    console.log('http://localhost:10001 서버 구동중')
});
