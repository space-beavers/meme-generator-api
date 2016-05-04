

function buildMemeUri(req, imageUrl, headerText, footerText) {
    var uri = req.protocol + '://' + req.get('host') + '/memes/card?'
        + req.app.locals.QS_IMAGEURL + '=' + req.body.imageUrl
        + '&' + req.app.locals.QS_HEADERTEXT + '=' + req.body.headerText
        + '&' + req.app.locals.QS_FOOTERTEXT + '=' + req.body.footerText;
    return uri;
};

module.exports = {
    BuildMemeUri: buildMemeUri
};