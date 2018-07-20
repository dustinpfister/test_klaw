let klaw = require('klaw'),
path = require('path'),
through2 = require('through2'),
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

// for each item that remains
.on('data', function (item) {

    console.log(item.path);

});
