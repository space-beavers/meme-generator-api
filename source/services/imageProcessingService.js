var tmp = require('tmp');

var ImageProcessingService = function (_req) {
    req : _req;
};

ImageProcessingService.prototype.Setup = function () {
    
    var uriBuilder = new ImageUriBuilder(req.body.imageUrl, req.body.headerText, req.body.footerText);
    
    return {
        memeCardUrl: uriBuilder.buildMemeUri(req.protocol, req.host),

        tmpName: tmp.tmpNameSync({
            template: '/memes/meme-XXXXXXXXX',
            keep: true
        }),
        outputFileName: './public/uploads' + tmpName + '.png', 
        screenShotOpts: {
            shotSize: {
                width: 500,
                height: 500
            }
        }
    }

};

exports.imageProcessingService = ImageProcessingService;