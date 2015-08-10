var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    errorHandler = require('./lib/errorHandler'),
    urlParser = require('url'),
    environment = app.get('env');

// start server
var port = process.env.PORT || 80;
http.listen(port);

// middlewares
app.use(errorHandler());
app.use(bodyParser.json({ limit: '50mb' }));

// serve static files
var staticFolderPath = environment === 'development' ? config.publicPath : config.buildPath;
app.use(express.static(path.join(__dirname, staticFolderPath), {
    index: 'none'
}));

// serve empty cordova
app.get('/cordova.js', function (req, res) {
    res.send();
});

// send request
/*
{
    url: String,
    method: String,
    headers: Object,
    data: Object
}
*/
app.post('/send', function (req, res) {
    var data = req.body,
        url = data.url,
        parsedUrl = urlParser.parse(url);

    var protocol = parsedUrl.protocol ? parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1) : 'http',
        provider = require(protocol);

    var options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (protocol === 'https' ? 443 : 80),
        path: parsedUrl.path,
        method: data.method,
        headers: data.headers ? JSON.parse(data.headers) : null
    };

    var request = provider.request(options, done);
    if (data.data && (data.method === 'POST' || data.method === 'PUT')) {
        request.write(data.data, 'utf8');
    }

    request.on('error', res.handle(done));
    request.end();

    function done(response) {
        collectChunks(response, res.handle(function (result) {
            res.send({
                status: response.statusCode,
                data: result,
                headers: response.headers
            });
        }));
    }
});

function collectChunks (response, callback) {
    var chunks = '';
    response.setEncoding('utf8');

    response.on('data', function (chunk) {
        chunks += chunk;
    });

    response.on('end', function () {
        callback(null, chunks);
    });
}

// serve layout
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, staticFolderPath, './index.html'));
});