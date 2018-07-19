let klaw = require('klaw'),
path = require('path'),

through2 = require('through2'),

// the state
state = {

    dir_walk: process.argv[2] || process.cwd(),
    items: []

};

// klaw the path at dir_walk, with the following options
klaw(state.dir_walk, {

    depthLimit: -1, // what is only at root

})

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

    state.items.push(item);

    console.log(item.path);

})

// when done
.on('end', function () {

    console.log('found: ' + state.items.length + ' html files.');

});
