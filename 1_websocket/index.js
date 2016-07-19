var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });
var express = require('express');
var app = express();

/*
 * HTTP
 */

app.use(express.static(__dirname + '/web'));
app.listen(8000);

/*
 * WebSocket
 */

var wsList = [];

wss.on('connection', function(ws){
	wsList.push(ws);
	
	ws.on('message', function(data){
		for (var i = 0; i < wsList.length; ++i){
			wsList[i].send(data);
		}
	});

	ws.on('close', function(ws){
		var idx = wsList.indexOf(ws);
		wsList.splice(idx, 1);
	});
});
