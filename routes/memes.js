'use strict';

var express = require('express');
var router = express.Router();
var tmp = require('tmp');
var shorturl = require('shorturl');
var webshot = require('webshot');
var validator = require('././Utils/validator');

/**
 * Take in image, header and footer text and re-create the meme image, save and return a shortUrl.
 * TODO: Compose this into utilities.
 * @param imageUrl
 * @param headerText
 * @param footerText
 */
router.post('/', function (req, res, next) {

	validator.validateIncomingMessage(req,res,next);
    
	var imageUrl = req.body.imageUrl;
	var headerText = req.body.headerText;
	var footerText = req.body.footerText;

	var memeCardUrl = req.protocol + '://' + req.get('host') + '/memes?' + 'imageUrl=' + imageUrl + '&headerText=' + headerText + '&footerText=' + footerText;

	var tmpName = tmp.tmpNameSync({
		template: '/memes/meme-XXXXXXXXX',
		keep: true
	});

	var outputFileName = './public/uploads' + tmpName + '.png';

	var screenShotOpts = {
		shotSize: {
			width: 500,
			height: 500
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
