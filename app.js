var express = require('express');
var app = express();
app.use(express.static('public')); 
var http = require('http').Server(app);
var port = process.env.PORT || 3001;

// setup my socket server
var io = require('socket.io')(http);
 
io.on('connection', function(socket) {
    console.log('new connection');
    const count = io.engine.clientsCount;
    console.log("Connected clients: " + count);
    io.emit('participants',count);

    // Called when the client calls socket.emit('message')
    socket.on('message', function(obj) {
        console.log('Got message from client: ' + obj.msg);     
        // socket.broadcast.emit('message', msg); // to all, but the sender
        io.emit('message',obj); // to all, including the sender
    });

    socket.on('disconnect', function() {
        console.log('disconnection');
        const count = io.engine.clientsCount;
        console.log("Connected clients: " + count);
        io.emit('participants',count);
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});