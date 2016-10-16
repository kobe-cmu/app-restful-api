/**
 * Error Control Script for payments
 * @author Kobe
 */


function MISSING_PA_ATTRIBUTE(res, reqBody) {
    if(reqBody.accountType === undefined ||
       reqBody.accountNumber === undefined ||
       reqBody.expirationDate === undefined ||
       reqBody.nameOnAccount === undefined ||
       reqBody.bank === undefined) {
        res.status(400).json({
            "errorCode": 2001,
            "errorMsg": "missing payment account attribute, required attribute: year, maker, model, doorNum, passNum, license, driverID, insurance",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
};

/* sttribute type error */
function WRONG_PA_ATTRIBUTE_TYPE(res, reqBody) {
    if(typeof reqBody.license !==  'string' ||
       typeof reqBody.maker !== 'string' ||
       typeof reqBody.model !== 'string') {
        res.status(400).json({
            "errorCode": 2002,
            "errorMsg": "payment account attributes type error, these attributes required to be String type: license, maker, model",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
};

/* attribute value error*/
function INVALID_PA_ATTRIBUTE_VALUE(res, reqBody) {
    if(reqBody.year.length > 4 ||
       reqBody.doorNum >= 8) {
        res.status(400).json({
            "errorCode": 2003,
            "errorMsg": "payment account attributes value is not valid: year should be 4 bits, doorNum no more than 8",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
};

/* duplicate attribute value error*/
function DUPLICATE_PA_ATTRIBUTE_VALUE(res, reqBody, Pa) {
    Pa.find(function(err, pas) {
        var paObj = pas.filter(function(element) {
            return element.license == reqBody.license;
        })[0];
        if(paObj !== undefined) {
            res.status(400).json({
                "errorCode": 2004,
                "errorMsg": "payment account license attribute's value is duplicate",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            })
        }
    })
};

/* Invalid attribute key*/
function INVALID_PA_ATTRIBUTE_KEY(res, reqBody, Pa) {
    var pa_attribute_list = ["accountType", "accountNumber", "expirationDate", "nameOnAccount", "bank"];
    Pa.find(function(err, pas) {
        for (var attribute in reqBody) {
            if(pa_attribute_list.indexOf(attribute) === -1) {
                res.status(400).json({
                    "errorCode": 2005,
                    "errorMsg": "invalid pa attribute key",
                    "statusCode": 400,
                    "statusTxt": "Bad Request"
                })
            }
        }
    })
};


module.exports = {
    throw_missing_pa_attribute: MISSING_PA_ATTRIBUTE,
    throw_wrong_pa_attribute_type: WRONG_PA_ATTRIBUTE_TYPE,
    throw_invalid_pa_attribute_value: INVALID_PA_ATTRIBUTE_VALUE,
    throw_duplicate_pa_attribute_value: DUPLICATE_PA_ATTRIBUTE_VALUE,
    throw_invalid_pa_attribute_key: INVALID_PA_ATTRIBUTE_KEY
}