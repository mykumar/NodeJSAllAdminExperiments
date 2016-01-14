var http = require('http');

var cs = http.createServer();

cs.on('request', function(req, res) {
	res.writeHead(200, {'content-Type': 'text/plain'});
	res.end('Hello shiva kuamr s  ONNNNNNNN \n');
});

cs.on('response', function(req, res) {
	res.writeHead(200, {'content-Type': 'text/plain'});
	res.end('Hello response *********** \n');
});


cs.listen(3000);

console.log('server running on port 3000');