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

            // if it is an article
            if ($('meta[content="article"]').length) {

                // title, and paragraph text
                item.title = $('title').text();
                item.text_p = $('.article-inner>>p').text();

                // push the item
                stream.push(item);

            }

            next();

        }).catch (function (e) {

            console.log(e);
            next();

        })

    }))

// for each article
.on('data', function (item) {

    console.log('********** ********** **********');
    console.log(item.title);
    console.log(item.text);
    console.log('********** ********** **********');

});
