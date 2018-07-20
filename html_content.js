let klaw = require('klaw'),
path = require('path'),
through2 = require('through2'),
cheerio = require('cheerio'),
fs = require('fs-extra'),
dir_walk = process.argv[2] || process.cwd();

// lets klaw
klaw(dir_walk)

// only html
.pipe(through2.obj(function (item, enc, next) {

        let ext = path.extname(item.path);

        if (ext.toLowerCase() === '.html' || ext.toLowerCase() === '.htm') {

            this.push(item);

        }

        next();

    }))

// read html
.pipe(through2.obj(function (item, enc, next) {

        let stream = this;

        fs.readFile(item.path).then(function (html) {

            // buffer to string
            html = html.toString();

            let $ = cheerio.load(html);

            console.log($('title').text());

            if ($('meta[content="article"]').length) {

                stream.push(item);

            }

            next();

        }).catch (function (e) {

            console.log(e);
            next();

        })

    }))

// for each item that remains
.on('data', function (item) {

    console.log(item.path);

});
