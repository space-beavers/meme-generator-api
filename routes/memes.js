'use strict';

var express = require('express');
var router = express.Router();
var tmp = require('tmp');
var shorturl = require('shorturl');
var webshot = require('webshot');
var validator = require('./../source/Utils/validator');
var imageDimensions = require('./../source/Utils/ImageDimensions');
require("./../source/Utils/UriBuilder");

/**
 * Take in image, header and footer text and re-create the meme image, save and return a shortUrl.
 * TODO: Compose this into utilities.
 * @param imageUrl
 * @param headerText
 * @param footerText
 */
router.post('/', function (req, res, next) {

	validator.validateIncomingMessage(req,res,next);
    
	var uriBuilder = new ImageUriBuilder(req.body.imageUrl, req.body.headerText, req.body.footerText);
	var memeCardUrl = uriBuilder.buildMemeUri(req.protocol, req.host)

	var tmpName = tmp.tmpNameSync({
		template: '/memes/meme-XXXXXXXXX',
		keep: true
	});

	var outputFileName = './public/uploads' + tmpName + '.png';

    //todo : Make this an querystring argument ie(req.query["size"]) and publish sm,md,or lg to documentation.
    //todo: Users should be able to choose sizes
	var imageDimensions = new ImageDimensions().SetSize("md");  //setting medium as default
	var screenShotOpts = {
		shotSize: {
			width: imageDimensions.x,
			height: imageDimensions.y
		}
	};

	webshot(memeCardUrl, outputFileName, screenShotOpts, function(err) {
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

  res.render('meme', {
  	headerText: req.query.headerText,
  	footerText: req.query.footerText,
  	imageUrl: req.query.imageUrl
  });
});

module.exports = router;
