var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    static = require('node-static');

var file = new static.Server('../assets');

http.createServer(function(req, res) {
    console.log(req.method); console.log(req.url);
    if(req.url === '/upload' && req.method.toLowerCase() === 'post') {
        // handle upload
        var form = new formidable.IncomingForm();
        form.uploadDir = 'D:\\temp';
        form.parse(req, function(err, fields, files) {
            console.log('cb');
            res.end();
        });

        form.on('progress', function() {
            console.log('progress');
        });
        form.on('fileBegin', function(name, file) {
            console.log(file);
        });
        form.on('file', function() {
            console.log('file');
        });
        form.on('end', function() {
            console.log('end');
        });
    }
    else {
        // serve static
        req.on('end', function() {
            file.serve(req, res);
        }).resume();
    }
}).listen(8080);