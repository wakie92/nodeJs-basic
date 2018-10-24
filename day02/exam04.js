
var func = function(){
    console.log("aaaa 이벤트 발생...");
}


process.once('aaa',func);//한번만 실행 일회용
process.on('aaa',func);

setInterval(function(){
    process.emit('aaa')
    ; //aaa는 이벤트가 아니기 때문에 발생하지않지만 emit을 이용하여 나만의 이벤트를 발생시킬수있다.
},1000);

setTimeout(function(){
    process.removeListener('aaa',func)
},5000)

