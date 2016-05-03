var tmp = require('tmp');
var iub = require('./../../utils/UriBuilder');
var Q = require('q');

function imageProcessingSetup(req) {
    var deferred = Q.defer();

    // set cat to either user supplied or our default
    var category = (req.body.category) ? req.body.category : req.app.locals.DefaultPublicFolder;

    var tmpFileName = tmp.tmpNameSync({
        template: category + '/meme-XXXXXXXXX',
        keep: true
    });

    var pathToSavedFile = '/uploads/memes/category/' + tmpFileName + '.png';

    var result = {
        // local output file path
        outputFileName: './public' + pathToSavedFile,
        // url for our own app to take a snapshot from
        memeCardUrl: iub.BuildMemeUri(req),
        // the url that we saved the snapshot to
        savedFileUrl: req.protocol + '://' + req.get('host') + pathToSavedFile,

        // meme screenshot config
        screenShotOpts: {
            shotSize: {
                width: 500,
                height: 500
            }
        }
    };

    deferred.resolve(result);

    return deferred.promise;
};

module.exports = {
    setup: imageProcessingSetup
};
