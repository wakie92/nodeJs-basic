/*
    createReadStream(path, [option])
    creadteWriteStream(path, [option])
    
    사용가능 event
    open, data, end, close, error
*/

var fs = require('fs');

var inFile = fs.createReadStream(__dirname +'/input.txt',{flags : 'r'})
//var inFile = fs.createReadStream(__dirname +'/input.txt',{flags : 'r', start :5, end :10})
//var inFile = fs.createReadStream(__dirname +'/input.txt',{flags : 'r', highWaterMark :10})
var outFile = fs.createWriteStream(__dirname +'/output.txt',{flags : 'w'});


inFile.on('open',function(){
    console.log('open 이벤트 발생...');
});
inFile.on('data',function(data){
    console.log('읽어온 내용 ' + data)
    outFile.write(data);
    console.log('data 이벤트 발생...');
});
inFile.on('end',function(){
    console.log('파일읽기 완료')
    //console.log('end 이벤트 발생...');
});
outFile.on('end',function(){
    console.log('파일읽기 완료')
    //console.log('end 이벤트 발생...');
});
inFile.on('close',function(){
    console.log('close 이벤트 발생...');
});
inFile.on('error',function(){
    console.log('error 이벤트 발생...');
});