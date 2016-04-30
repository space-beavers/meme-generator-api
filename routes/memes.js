'use strict';

var express = require('express');
var router = express.Router();

var shorturl = require('shorturl');
var webshot = require('webshot');
var imageProcessingService = require('./../source/services/imageProcessingService');
var validator = require('./../source/utils/validator');
var cssFileResolver = require('./../source/utils/CssFileResolver');


/**
 * Take in image, header and footer text and re-create the meme image, save and return a shortUrl.
 * TODO: Compose this into utilities.
 * @param imageUrl
 * @param headerText
 * @param footerText
 */
router.post('/', function (req, res, next) {

	validator.validateIncomingMessage(req,next);
	var setup = imageProcessingService.imageProcessingService(req).Setup();

	webshot(setup.memeCardUrl, setup.outputFileName, setup.screenShotOpts, function(err) {
		if(err){
			next(err);
		}
		var fullUrlToLongFileName = req.protocol + '://' + req.get('host') + outputFileName.replace('./public', '');
	  	shorturl(fullUrlToLongFileName, function(shortUrl) {
			res.send({
				imageURL: shortUrl
			});
		});
	});

});

/**
 * This is the route that renders the image used by the post above to take a screenshot...
 */
router.get('/', function(req, res, next) {

    var cssDimensionsFile = cssFileResolver.cssFileResolver;
    cssDimensionsFile.setFile(req.query.size);  //setting medium as default
    
  res.render('meme', {
  	headerText: req.query.headerText,
  	footerText: req.query.footerText,
  	imageUrl: req.query.imageUrl, 
    cssFile: cssDimensionsFile.cssFile
  });
});

module.exports = router;
