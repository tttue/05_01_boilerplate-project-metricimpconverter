'use strict';
/*
	npm link express
	npm link body-parser
	npm link cors
	npm link mocha
	npm link chai
	npm link chai-http
	npm link path
	npm link fs
	npm link helmet
*/

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), 'environment.txt') });

var apiRoutes = require('./routes/api.js');
var fccTestingRoutes = require('./routes/fcctesting.js');
var runner = require('./test-runner');

var app = express();

// Security prevent
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
	.get(function (req, res) {
		res.sendFile(process.cwd() + '/views/index.html');
	});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
	res.status(404)
		.type('text')
		.send('Not Found');
});

//Start our server and tests!
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Listening on port " + listener.address().port);
	if (process.env.NODE_ENV === 'test') {
		console.log('Running Tests...');
		setTimeout(function () {
			try {
				runner.run();
			} catch (e) {
				var error = e;
				console.log('Tests are not valid:');
				console.log(error);
			}
		}, 1500);
	}
});

module.exports = app; //for testing
