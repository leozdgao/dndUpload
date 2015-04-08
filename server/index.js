var fs = require('fs'),
    config = require('./config.json');

var uploadpath = config["upload_dir"];
if(!uploadpath || !fs.existsSync(uploadpath)) {
    console.log('Please provide a existed upload directory to the config \'upload_dir\'.');
    process.exit(0); // exit
}

var formidable = require('formidable'),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    static = require('node-static');

var file = new static.Server(path.resolve(__dirname, '../assets'));

http.createServer(function(req, res) {

    if(req.url === '/upload' && req.method.toLowerCase() === 'post') {
        // handle upload
        var form = new formidable.IncomingForm();
        
        form.uploadDir = uploadpath;

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