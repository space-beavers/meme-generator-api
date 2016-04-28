var ImageDimensions = function(_width , _height ) {
    x: _width;
    y: _height;
};
ImageDimensions.prototype.SetSize = function (size) {
    if(size === undefined) {
        size = "md";
    }
    switch (size) {
        case "sm" :
            this.x = 250;
            this.y = 250;
        break;
        case "md" :
            this.x = 500;
            this.y = 500;
        break;
        case "lg" :
            this.x = 1000;
            this.y = 1000;
            break;
    }
};

exports.imageDimensions = ImageDimensions;