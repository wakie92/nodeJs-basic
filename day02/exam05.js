var events = require('events');

var myEvent = new events.EventEmitter();

myEvent.on('aaa', function(){
    console.log('aaa 이번트 발생')
});

setTimeout(function(){
    myEvent.emit('aaa');
},2000)