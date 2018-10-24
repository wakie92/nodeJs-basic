/*
    on
    addListener()
    removeListener()
    
*/
var func = function (){
    console.log("exit 이벤트 발생");
}

process.addListener('exit',func);
/*

process.addListener('exit',function(){
    console.log("exit 이벤트 발생 ...");
})
*/

process.removeListener('exit');

setTimeout(function(){
    process.exit(0);
},2000);
