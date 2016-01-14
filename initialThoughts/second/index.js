var conn = require('connect');
var app = conn();
app.use(logger);
app.use('/hello', hello);
app.listen(5000);


function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}
function hello(req,res,next) {
	console.log('This is the hello');
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello my world THIS IS AWESOME');
	next();
}


