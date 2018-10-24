/*
    crypto : 암호화 관련 모듈
            
    'aaa' --->'eee' --->'aaa'
               암호화     복호화
     암호화를 하면 복호화 할수있다.
*/

var crypto = require('crypto');

var shaHash = crypto.createHash('sha256')
shaHash.update('천재아니면바보');
var shaOutput = shaHash.digest('hex');

console.log('sha256 : ' +shaOutput);//복호화가 안되는 방식

var password = '홍길동천재';
var key = '천재아니면바보';

var cipher = crypto.createCipher('aes192',key);
cipher.update(password,'utf-8','base64');
var cipherOutput = cipher.final('base64');


    
var decipher = crypto.createDecipher('aes192', key);
decipher.update(cipherOutput, 'base64', 'utf-8');
var decipherOutput = decipher.final('utf-8');






console.log('password : ' + password);
console.log('암호화  : ' + cipherOutput);
console.log('복호화 : ' + decipherOutput);