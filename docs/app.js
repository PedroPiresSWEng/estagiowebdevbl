/*var express = require('express'),
	app = express();

app.use(express.logger());

app.get('/', function(req, res){
	res.send('Ola Mundo');
});

var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.adress().port); */
	

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	console.log('request was made:' + req.url);
	res.writeHead(200, {'Content-type': 'application/json'});
	var myObj = {
		(dados)
	};
	res.end(req);
});

server.listen(3000, '127.0.0.1');
console.log('Listening to port 3000');
