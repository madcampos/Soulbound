/*global require,console */

var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
	var file = process.cwd() + req.url;
	
	path.exists(file, function(exists){
		if (!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.end('404 file not found!');
			return;
		}
		fs.readFile(file, function(err, data){
			if (err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.end('' + err);
				return;
			}
			
			res.writeHead(200);
			res.end(data);
		});
	});
});
server.listen(8080);