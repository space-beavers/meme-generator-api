
var ImageUriBuilder = function (_imageUrl, _headerText, _footerText) {
    imageUrl: _imageUrl;
    headerText: _headerText;
    footerText: _footerText;

};

ImageUriBuilder.prototype.buildMemeUri = function(protocol, host) {
    return protocol + '://' + host + '/memes?'
        + 'imageUrl=' + this.imageUrl
        + '&headerText=' + this.headerText
        + '&footerText=' + this.footerText;

};


exports.UriBuilder = ImageUriBuilder;