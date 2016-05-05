'use strict';

var Q = require('q');
var fs = require('fs');
var readdir = Q.denodeify(fs.readdir);
var iub = require('../../utils/UriBuilder');


// proxy fs.exists to return a promise. Example of Q.defer
function exists(file) {
    var deferred = Q.defer();
    fs.exists(file, function(result) {
        return result ? deferred.resolve(file) : deferred.reject('invalid file');
    });
    return deferred.promise;
}

function stat(req, category, baseMemesFolder, file) {
    return Q.nfcall(fs.stat, baseMemesFolder + '/' + file)
        .then(function(stats) {
            stats.filename = iub.BuildCategoryUri(req, category, file);
            // no need to return all file stats so just short-circuit it here.
            return {
                url: stats.filename
            };
        });
}

/**
 * Reads a category folder and returns the listings as an array of objects...
 * @param category Folder name where memes are stored.
 */

function memeListingFromFolder(req, category) {
    //TODO: make this path into an app constant..
    var memesFolderPath = './public/uploads/memes/category/' + category;

    return readdir(memesFolderPath)
        .then(function(files) {
            return files.map(function(file) {
                return stat(req, category, memesFolderPath, file);
            });
        })
        .then(Q.all);
}


module.exports = {
    getCategoryAsArray: memeListingFromFolder
};
