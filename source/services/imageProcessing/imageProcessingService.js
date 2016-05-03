var tmp = require('tmp');
var iub = require('./../../utils/UriBuilder');
var cr = require('./../../utils/CategoryResolver');
var q = require('q');

function imageProcessingSetup(req) {
    var deferrer = q.defer();
    // cr.createIfDirectoryDoesNotExist(req.body.category ? req.body.category : req.app.locals.DefaultPublicFolder).then(function (resolve) {

    var category = (req.body.category) ? req.body.category : req.app.locals.DefaultPublicFolder;
    console.log('USING CATEGORY', category);
    var result = {
        memeCardUrl: iub.ImageUriBuilder.buildMemeUri(req),

        tmpName: tmp.tmpNameSync({
            template: category + '/memes/meme-XXXXXXXXX',
            keep: true
        }),
        outputFileName: './public/images/category/' + tmpName + '.png',
        screenShotOpts: {
            shotSize: {
                width: 500,
                height: 500
            }
        }
    };
    deferrer.resolve(result);

    // }, function(reject){
    //     throw Error(reject);
    // });
};

module.exports = {
    setup: imageProcessingSetup
};
