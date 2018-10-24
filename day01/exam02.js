//module.exports를 가르키는 exports
exports.aaa = function (){
    console.log('aaa()함수 호출')
    
}

exports.bbb = function(){
    
    console.log('bbb()함수 호출')
    
}

exports.ccc = function(name){
    return 'hello' + name
}

exports.ddd = '3.14';
exports.eee = {
    name : 'ghi',
    age : 20,
    funcc : function(){
        console.log('func() 호출');
    }
};