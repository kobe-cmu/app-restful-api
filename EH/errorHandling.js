/**
 * Error Control Script for common use
 * @author Kobe
 * @version 0.0.2
 */

function errorHandle(err) {
    var errMsgs = [];
    for(var key in err.errors){
        if (err.errors[key].kind === "required") {
            var newMsg = {
                "errorCode": 1001,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "minlength") {
            var newMsg = {
                "errorCode": 1002,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "maxlength") {
            var newMsg = {
                "errorCode": 1003,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "user defined") {
            var newMsg = {
                "errorCode": 1004,
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
        if (err.errors[key].kind === "ObjectID") {
            var newMsg = {
                "errorCode": 1007, // identifier should not provided when patching
                "errorMsg": err.errors[key].message,
                "statusCode": 400,
                "statusTxt": "Bad Request"
            };
            errMsgs.push(newMsg);
        }
    }
    if (err.kind === "ObjectId") {
        var newMsg = {
            "errorCode": 1006, // identifier not matching any resource instance
            "errorMsg": err.message,
            "statusCode": 404,
            "statusTxt": "Bad Request"
        };
        errMsgs.push(newMsg);
    }
    return errMsgs;
};
module.exports = {
    errorHandle: errorHandle
}