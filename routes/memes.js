'use strict';

var express = require('express');
var router = express.Router();
var tmp = require('tmp');
var shorturl = require('shorturl');
var webshot = require('webshot');

/* Save base64 to image and return path */
router.post('/', function (req, res) {
	if (!req.body || !req.body.imageUrl || !req.body.headerText || !req.body.footerText) return res.sendStatus(400);

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
			width: 300,
			height: 300
		}
	};

	webshot(memeCardUrl, outputFileName, screenShotOpts, function(err) {
		var fullUrlToLongFileName = req.protocol + '://' + req.get('host') + outputFileName.replace('./public', '');
	  	shorturl(fullUrlToLongFileName, function(shortUrl) {
			res.send({
				imageURL: shortUrl
			});
		});
	});

});

router.get('/', function(req, res, next) {

  res.render('meme', {
  	headerText: req.query.headerText,
  	footerText: req.query.footerText,
  	imageUrl: req.query.imageUrl
  });
});

module.exports = router;
