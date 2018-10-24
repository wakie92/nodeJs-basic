//mongodb와의 연동
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;//mongo와 접속을 가능하게함
//커맨드창에서 mongod --dbpath D:\Lecture\mongodb\db 설정후 다른 커맨드창에서mongo 연결



mongoClient.connect('mongodb://localhost:27017',function(error,client){
    console.log('sss');
    if(!error){
        var db = client.db('test')//text까지 연결
        
        db.collection('employees').find().toArray(function(error,result){
          console.log(result);
        });
    
    };
})
