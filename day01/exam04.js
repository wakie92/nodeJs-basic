/*
    url 모듈 
    parse("url문자열") : url문자열을 url 객체로 변환
    format(url객체) : url객체를 url문자열로 변환
     querystring module
    parse()      : query문자열을 query객체 변환
    stringify()  : query객체를 query문자열 변환
*/

var url = require('url');
var querystring = require('querystring')
var urlObj = url.parse(https://search.naver.com/search.naver?where=nexearch&query=%EC%8B%A0%EA%B3%BC%ED%95%A8%EA%BB%98+2&sm=top_lve&ie=utf8);
console.log(urlObj);
console.log('-------------------');
console.log(urlObj.format());

console.log(urlObj.query);

console.log(querystring.parse(urlObj.query));
console.log('-------------------');
var urlObj = url.parse('https://search.naver.com/search.naver?where=nexearch&query=%EC%8B%A0%EA%B3%BC%ED%95%A8%EA%BB%98+2&sm=top_lve&ie=utf8',true);
console.log(urlObj.query)