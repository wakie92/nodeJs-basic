/*
    fs: 파일시스템 모듈
    
    readFile(파일명, charset, callback)
    writeFile(파일명, 데이터, charset, callback);
    readFileSync()
    writeFileSync()
*/

var fs = require('fs');
console.log(__dirname);
/*
var text = '반갑습니다. node.js님';
fs.writeFile(__dirname +'/text.txt', text,'utf-8' ,function(error){
    
        if(error){
            console.log('파일저장시 오류가 발생하였습니다.');
        }else{
            console.log('파일저장을 완료하였습니다.');    
        }
    
})*/

fs.readFile(__dirname + '/text.txt','utf-8', function(error,data){
    if(error){
        console.log('파일 로드시 오류가 발생합니다.');
        console.log(error);
    }else{
        console.log('파일 읽기를 완료하였습니다.')
        console.log(data);
    }
})