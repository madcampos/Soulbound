'use strict';

let readFile = require('fs').readFileSync;
let normalize = require('path').normalize;
let createWriteStream = require('fs').createWriteStream;
let morgan = require('morgan');
let helmet = require('helmet');
let config = require('config');
let subdomain = require('express-subdomain');
let body = require('body-parser');
let app = require('express')();
let mongoose = require('mongoose');

let httpServer = require('http').createServer(app);
let httpsServer = require('https').createServer({key: readFile(config.get('https.key')), cert: readFile(config.get('https.cert'))}, app);

//Security
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.hsts({maxAge: 7776000000, includeSubdomains: true}));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

//Middlewares
app.use(body.json());

//Logging
app.use(morgan('common', {stream: createWriteStream(normalize(config.get('logfile')), {flags: 'a+'})}));

//Routes
app.use(require('../routes/redirect'));

//API v1
app.use(subdomain('api.v1', require('./api/v1')));
app.use('/api/v1/', require('./api/v1'));

//Default route: 404
app.use(require('../routes/redirect').notFoundRoute);

//Logs
mongoose.connection.on('open', () => console.log('DB connection opened.'));
httpServer.on('listening', () => console.log(`HTTP server started at port ${config.get('http.port')}.`));
httpsServer.on('listening', () => console.log(`HTTPS server started at port ${config.get('https.port')}.`));

mongoose.connection.on('close', () => console.log('DB connection closed.'));
httpServer.on('close', () => console.log('Stoping HTTP server.'));
httpsServer.on('close', () => console.log('Stoping HTTPS server.'));

mongoose.connection.on('error', (err) => console.error(`Mongodb error: ${err}`));
httpServer.on('error', (err) => console.error(`HTTP error: ${err}`));
httpsServer.on('error', (err) => console.error(`HTTPS error: ${err}`));

module.exports = {
	start: () => {
		mongoose.connect(config.get('db.url'));
		httpServer.listen(config.get('http.port'));
		httpsServer.listen(config.get('https.port'));
	},
	stop: () => {
		mongoose.connection.close();
		httpServer.close();
		httpsServer.close();
	}
};