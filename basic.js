let klaw = require('klaw');

klaw('../blog_posts/_posts')

.on('data', function (item) {

    console.log(item);

});
