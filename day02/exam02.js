/*
    open(파일명, flag, callback)
    read()
    write()
    close()
*/
//r 모드
var fs = require('fs');
fs.open(__dirname +'/text01.txt','r',function(error,fileId){ 
    if(error){
        console.log("error");
    }else{
        var buf = new Buffer(15);//공간의 크기
        fs.read(fileId,buf,0,buf.length,null,function(error,readLength){
            if(error){
                console.log("error");
            }else{
                console.log(readLength)
                console.log(buf.toString("utf-8",0, buf.length))
            }
        })
        
    }
      
});
/*  w,a 모드
var fs = require('fs');
fs.open(__dirname +'/text01.txt','a',function(error,fileId){//w,r모드 둘다 쓸수있다. 그러나 w를 쓰게되면 이전에 있던 기록은 다 사라지고 새로 써진다. 
    if(error){
        console.log("error");
    }else{
        var buf= new Buffer("안녕...\n");
        fs.write (fileId, buf, 0 , buf.length,null,function(error,length){
            if(error){
                console.log("error");
            }else{
                //console.log(length);//byte크기로 나온다. 사실else절이 r모드에선 의미가 별로없음.
                console.log("파일수행완료  + " + length)
            }
        });
        
        
        fs.close(fileId,function(){
            console.log('file colose 수행...');
        })
    }
});

*/
