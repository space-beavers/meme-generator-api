function buildMemeUri(req) {
    return req.protocol + '://' + req.get('host') + '/memes?'
        + constants.QS_IMAGEURL + '=' + this.imageUrl
        + '&' + constants.QS_HEADERTEXT + '=' + this.headerText
        + '&' + constants.QS_FOOTERTEXT + '=' + this.footerText;
};


module.exports = {
    BuildMemeUri: buildMemeUri
};