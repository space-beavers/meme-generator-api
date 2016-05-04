'use strict';

var express = require('express');
var router = express.Router();

var shorturl = require('shorturl');
var webshot = require('webshot');
var ips = require("./../source/services/imageProcessing/imageProcessingService");
var mls = require("./../source/services/memeListing/memeListingService");
var validator = require('./../source/utils/validator');
var cssFileResolver = require('./../source/utils/CssFileResolver');
var q = require("q");

/**
 * Take in image, header and footer text and re-create the meme image, save and return a shortUrl.
 * @param imageUrl
 * @param headerText
 * @param footerText
 */

router.post('/', function (req, res, next) {

  validator.validateIncomingMessage(req,next);
    var result;

    ips.setup(req).then(function(result) {
        if(result) {
            webshot(result.memeCardUrl, result.outputFileName, result.screenShotOpts, function(err) {
                if(err) next(err);

                shorturl(result.savedFileUrl, function(shortUrl) {
                    res.send({
                        imageURL: shortUrl
                    });
                });
            });
        }
    });
});

/**
 * This is the route that renders the image used by the post above to take a screenshot...
 */
router.get('/card', function(req, res, next) {

    var cssDimensionsFile = cssFileResolver.cssFileResolver;
    cssDimensionsFile.setFile(req.query.size);  //setting medium as default

    res.render('meme', {
        headerText: req.query.headerText,
        footerText: req.query.footerText,
        imageUrl: req.query.imageUrl,
        cssFile: cssDimensionsFile.cssFile
    });
});

router.get('/', function(req, res, next) {
    if(!req.query.category) {
        res.status(404).send({
            reason: 'Invalid Category'
        });
    }

    res.send({
        memes: mls.getCategoryAsArray(req.query.category)
    });
});

module.exports = router;