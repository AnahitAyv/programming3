var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."));

app.get('/', function(req,res){
    res.redirect('index.html');
});

server.listen(300,function(){
    console.log("Server is run");
});

