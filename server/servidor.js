var express = require('express');
var app = express();


app.get('/', function (req, res) {
    res.send("Olá!")
});

app.listen(3000);
console.log('Servindo em http://127.0.0.1:3000/');

// var http = require('http');
//
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
// }).listen(1337, '127.0.0.1');
//
