var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*
 * HTTP
 */

app.use(express.static(__dirname + '/web'));
server.listen(8000);

/*
 * WebSocket
 */

io.on('connection', function(socket){
	socket.on('message', function(data){
		io.sockets.send(data);
	});
});
