let klaw = require('klaw'),
path = require('path'),

// the dir to walk
dir_walk = process.argv[2] || process.cwd();


klaw(dir_walk, {

    depthLimit: 0, // what is only at root

})

.on('data', function (item) {

    if (!item.stats.isDirectory()) {

        console.log(path.basename(item.path));

    }

});
