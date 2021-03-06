let klaw = require('klaw'),
path = require('path'),

// the dir to walk
dir_walk = process.argv[2] || process.cwd();

// walking dir_walk with the following options
klaw(dir_walk, {

    // default to full recursion, if now depth is given
    depthLimit: process.argv[3] || -1,
    fs: require('fs-extra') // using fs-extra as the fs module

})

// for each item
.on('data', function (item) {

    // now using fs-extra in place of graceful-fs
    // So now I can use promises
    this.fs.readFile(item.path).then(function (data) {

        console.log(data.toString());

    }).catch (function (e) {

        console.log(e.message);

    });

});
