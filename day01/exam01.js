/*
    console 객체 관련 메소드
    -log : 출력
    변환문자 %d, %s, %j
    -time() 시간 측정 시작
    -timeEnd() 시간측정 종료
*/
console.log('hello');
console.log(__dirname);
console.log(__filename);

var a = 2.4;
var b = 12;
console.log(a + ' + ' + b + ' = ' + (a + b));
console.log('%d + %d = %d', a, b, a + b);
console.log('%s', 'hello');
var obj = {id : 'hong', age : 22};
console.log('%j', {id : 'hong', age : 22});
console.log(obj);
console.log('json ' + {id : 'hong', age : 22});
console.log('json  %j', {id : 'hong', age : 22});

console.time('first');
for(var i = 0; i < 10; i++) {
    console.time('second');
    var sum = 0;
    for(var j = 0; j < i; j++) {
        sum = sum + j;
    }
    console.timeEnd('second');
    console.log('sum : %d', sum);
}
console.timeEnd('first');

console.log(process.version);
console.log(process.versions);
console.log(process.args);
console.log(process.env);
console.log(process.platform);

for(var i = 0; i < 10; i++) {
    for(var j = 0; j < 10; j++) {
        if(i == 3)
            process.exit(0);
    }
    console.log('i = %d', i);
}
