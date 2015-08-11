var express = require('express'),
    bodyParser = require('body-parser'),
    urlParser = require('url'),
    app = express(),
    log = Mobile('log');

// greeting
log.call('Greeting from server');

// mw
app.use(bodyParser.json({ limit: '50mb' }));

/*
    url: String,
    method: String,
    headers: Object,
    data: Object
*/
app.post('/send', function (req, res) {
    var data = req.body,
        url = data.url,
        parsedUrl = urlParser.parse(url);

    var protocol = parsedUrl.protocol ? parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1) : 'http';
    log.call('protocol: ' + protocol);
    var provider = require(protocol);

    var options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (protocol === 'https' ? 443 : 80),
        path: parsedUrl.path,
        method: data.method,
        headers: data.headers ? JSON.parse(data.headers) : null
    };

    var request = provider.request(options, function (r) { done(null, r); });
    if (data.data && (data.method === 'POST' || data.method === 'PUT')) {
        request.write(data.data, 'utf8');
    }

    request.on('error', done);
    request.end();

    function done(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            collectChunks(response, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send({
                        status: response.statusCode,
                        data: result,
                        headers: response.headers
                    });
                }
            });
        }
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

// listen http
app.listen(3000, function () {
    log.call('Express server is started. (port: 3000)');
});