var fs = require('fs')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

fs.watch('smiles', function(event, filename) {
	// test if new file is created? hang af wat die processing stuff doen i guess
	if (event == 'rename') {
		console.log("smile added");
		io.emit('showForm');
	}
});
