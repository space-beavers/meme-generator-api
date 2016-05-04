'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Reads a category folder and returns the listings as an array of objects...
 * NOTE: Synchronous
 * @param category Folder name where memes are stored.
 */
function memeListingFromFolder(category) {
    var memesFolderPath = './public/uploads/memes/category/' + category;

    var memesResult = [];

    var files = fs.readdirSync(memesFolderPath);
    for (var i in files) {
        memesResult.push({
            url: files[i]
        });
    }
    return memesResult;
}

module.exports = {
    getCategoryAsArray: memeListingFromFolder
};
