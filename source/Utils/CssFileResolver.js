/*
    CssFile Resolver
    author: Sskaiknight
    
    @description: This class resolves a predefined css class to be passed to the jade template for the meme file
 */

var CssFileResolver = {

    cssFile : "meme-card-md.css",
    setFile : function(size) {

        var sm = "meme-card-sm.css";
        var md = "meme-card-md.css";
        var lg = "meme-card-lg.css";
        
        switch (size) {
            case "sm" :
                this.cssFile = sm;
                break;
            case "md" :
                this.cssFile = md;
                break;
            case "lg" :
                this.cssFile = lg;
                break;
            default :
                this.cssFile = md;
        }
    }
};

exports.cssFileResolver = CssFileResolver;