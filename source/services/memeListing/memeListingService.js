'use strict';

var fs = require('fs');
var path = require('path');

var iub = require('../../utils/UriBuilder');

/**
 * Reads a category folder and returns the listings as an array of objects...
 * FIXME: replace fs.readdirSync with fs.readdir and use promise...
 * @param category Folder name where memes are stored.
 */
function memeListingFromFolder(req, category) {
    var memesFolderPath = './public/uploads/memes/category/' + category;

    var memesResult = [];
    var files = fs.readdirSync(memesFolderPath);
    for (var i in files) {
        memesResult.push({
            url: iub.BuildCategoryUri(req, category, files[i])
        });
    }
    return memesResult;
}

module.exports = {
    getCategoryAsArray: memeListingFromFolder
};
