let klaw = require('klaw'),
fs = require('fs-extra'),
path = require('path'),

// the dir to walk
dir_walk = process.argv[2] || process.cwd();

// walking dir_walk with the following options
klaw(dir_walk, {

    // default to full recursion, if now depth is given
    depthLimit: process.argv[3] || -1,
    fs: fs

})

// for each item
.on('data', function (item) {

    /*
    // fs can be accessed by the this keyword
    this.fs.readFile(item.path, function (err, data) {

    if (data) {

    console.log('**********');
    console.log('path: ' + item.path);
    console.log('contents: ');
    console.log(data.toString());
    console.log('**********');

    }

    });
     */

    this.fs.readFile(item.path).then(function () {

        console.log('ahhh');

    }).catch (function (e) {

        console.log(e.message);

    })

});
