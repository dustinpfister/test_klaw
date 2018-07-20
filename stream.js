let klaw = require('klaw'),
path = require('path'),
stream = require('stream'),
dir_walk = process.argv[2] || process.cwd();

klaw(dir_walk)

// using stream.Transform in objectMode
.pipe(new stream.Transform({

        objectMode: true,
        transform: function (item, en, cb) {

            if (item.stats.size > 0 && item.stats.size < 1024) {

                this.push(item);

            }

            cb();

        }

    }))

// the filtered list of items
.on('data', function (item) {

    console.log(item.path);

});
