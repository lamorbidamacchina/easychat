var express = require('express');
var app = express();
app.use(express.static('public')); 
var http = require('http').Server(app);
var port = process.env.PORT || 3001;

// setup my socket server
var io = require('socket.io')(http);
 
io.on('connection', function(socket) {

    socket.on("room",function(room) {
        console.log("Room: " + room);
        socket.join(room);
    });
    
    console.log('New connection');
    const count = io.engine.clientsCount;
    console.log("Connected clients: " + count);
    io.emit('participants',count);
    // to do: count clients in a room 
    // https://stackoverflow.com/questions/31468473/how-to-get-socket-io-number-of-clients-in-room

    // Called when the client calls socket.emit('message')
    socket.on('message', function(obj) {
        console.log('Chatlog - Room: ' + obj.room + ' | ' + obj.userid + ': ' + obj.msg);     
        // socket.broadcast.emit('message', msg); // to all, but the sender
        io.to(obj.room).emit('message',obj); // to all, including the sender
    });

    // Called when a client disconnects
    socket.on('disconnect', function() {
        console.log('Disconnection');
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