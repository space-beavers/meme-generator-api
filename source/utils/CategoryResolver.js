const fs = require("fs");
var q = require("q");

function createIfNotExist(category) {
    var deferred = q.defer();
    var path = "./public/images/category/" + category;
    try {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
            deferred.resolve(true);
        }else{
            deferred.resolve(true);
        }
    }
    catch (e) {
        deferred.resolve(false);
    }
    return deferred.promise;
}

module.exports = {
    createIfDirectoryDoesNotExist: createIfNotExist
};
