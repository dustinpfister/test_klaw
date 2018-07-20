let klaw = require('klaw'),
path = require('path'),

// the dir to walk
dir_walk = process.argv[2] || process.cwd();

// walking dir_walk with the following options
klaw(dir_walk, {

    // default to full recursion, if now depth is given
    depthLimit: process.argv[3] || -1, 

})

// for each item
.on('data', function (item) {

    if (!item.stats.isDirectory()) {

        console.log(path.basename(item.path));

    }

});

// when the walk is over
.on('end', function () {

    console.log('the walk is over');

});
