

function validate( req, next) {
    if (!req.body || !req.body.imageUrl ||
        !req.body.headerText ||
        !req.body.footerText) {
        var err = new Error("Whoa dood!  You need to make sure that you have a header text, a body text and an \n" +
            "image selected for the imageUrl.  Check your values again.");
        next(err);
    }
}

// public api
module.exports = {
    validateIncomingMessage: validate
};
