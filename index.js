/*var socket = require('socket.io');
var express = require('express');
var http = require('http');
var https = require('https');
var port = 4000;
var app = express();

var server = http.createServer(app).listen(port, () => {
        console.log('listening on *:' + port)
    });

function emitNew(server) {
    var io = socket(server);
    io.on('connection', function (socket) {
        socket.on('new message', (msg) => {
            console.log(msg);
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: msg
            });
        })
    })
}

emitNew(server);*/

//socket.emit() single client
// socket.broadcast.emit() all clients except clien that's connecting
// io.emit() send all clientss

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('new message', (msg) => {
        io.emit('new message', msg);
    });
});

/*io.on('connection', (socket) => {
    console.log("User connected");
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});*/

http.listen(4000, () => {
    console.log('listening on *:4000');
});

