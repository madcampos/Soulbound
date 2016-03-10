'use strict';

let readFile = require('fs').readFileSync;
let normalize = require('path').normalize;
let createWriteStream = require('fs').createWriteStream;
let morgan = require('morgan');
let helmet = require('helmet');
let config = require('config');
let subdomain = require('express-subdomain');
let app = require('express')();

app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.hsts({maxAge: 7776000000, includeSubdomains: true}));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

app.use(morgan('common', {stream: createWriteStream(normalize(config.get('logfile')), {flags: 'a+'})}));

//Routes
app.use(require('./routes/redirect'));

//API v1
app.use(subdomain('api.v1', require('./src/api/v1')));
app.use('/api/v1', require('./src/api/v1'));

app.use((req, res) => {
	console.log(`Got request from: ${req.get('User-Agent')} @ ${req.path}`);
	res.send('Oh, hi!');
});

require('http').createServer(app).listen(config.get('http.port'), () => console.log(`HTTP server started at port ${config.get('http.port')}.`));
require('https').createServer({key: readFile(config.get('https.key')), cert: readFile(config.get('https.cert'))}, app).listen(config.get('https.port'), () => console.log(`HTTPS server started at port ${config.get('https.port')}.`));