/**
 * Error Control Script for driver use
 * @author Kobe
 * @version 0.0.2
/* required attribute */
function MISSING_DRIVER_ATTRIBUTE(res, reqBody) {
    if(reqBody.firstName === undefined ||
       reqBody.lastName === undefined ||
       reqBody.dateOfBirth === undefined ||
       reqBody.licenseType === undefined ||
       reqBody.username === undefined ||
       reqBody.emailAddress === undefined ||
       reqBody.password === undefined ||
       reqBody.addressLine1 === undefined ||
       reqBody.addressLine2 === undefined ||
       reqBody.city === undefined ||
       reqBody.state === undefined ||
       reqBody.zip === undefined ||
       reqBody.phoneNumber === undefined) {
        res.status(400).json({
            "errorCode": 2001,
            "errorMsg": "missing driver attribute",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* sttribute type error */
function WRONG_DRIVER_ATTRIBUTE_TYPE(res, reqBody) {
    if(typeof reqBody.firstName !==  'string' ||
       typeof reqBody.lastName !== 'string' ||
       typeof reqBody.username !== 'string') {
        res.status(400).json({
            "errorCode": 2002,
            "errorMsg": "driver attributes type error, these attributes required to be String type: firstname, lastname, username",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* attribute value error
 * - phone number should be < 12 bits
 */
function INVALID_DRIVER_ATTRIBUTE_VALUE(res, reqBody) {
    if(reqBody.phoneNumber.length > 12) {
        res.status(400).json({
            "errorCode": 2003,
            "errorMsg": "driver attributes value is not valid: phone number no more than 12 bits",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* duplicate attribute value error
 * - email address should not duplicate
 * - phone number should not duplicate
 */
function DUPLICATE_DRIVER_ATTRIBUTE_VALUE(res, reqBody, Driver) {
    Driver.find(function(err, drivers) {
        var driverObj1 = drivers.filter(function(element) {
            return element.emailAddress == reqBody.emailAddress;
        })[0];
        if(driverObj1 !== undefined) {
            res.status(400).json({
                "errorCode": 2004,
                "errorMsg": "driver email address attribute's value is duplicate",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            })
        }
        var driverObj2 = drivers.filter(function(element) {
            return element.phoneNumber == reqBody.phoneNumber;
        })[0];
        if(driverObj2 !== undefined) {
            res.status(400).json({
                "errorCode": 2004,
                "errorMsg": "driver phone number attribute's value is duplicate",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            })
        }
    })
}

/* Invalid attribute key
 * - Attribute Key is not invalid (not defined in database)
 */
function INVALID_DRIVER_ATTRIBUTE_KEY(res, reqBody, Driver) {
    var driver_attribute_list = ["firstName", "lastName", "dateOfBirth", "username", "emailAddress", "addressLine1", "addressLine2", "city", "state", "zip", "phoneNumber"];
    Driver.find(function(err, drivers) {
        for (var attribute in reqBody) {
            if(driver_attribute_list.indexOf(attribute) === -1) {
                res.status(400).json({
                    "errorCode": 2005,
                    "errorMsg": "invalid driver attribute key",
                    "statusCode": 400,
                    "statusTxt": "Bad Request"
                })
            }
        }
    })
}


module.exports = {
    throw_missing_driver_attribute: MISSING_DRIVER_ATTRIBUTE,
    throw_wrong_driver_attribute_type: WRONG_DRIVER_ATTRIBUTE_TYPE,
    throw_invalid_driver_attribute_value: INVALID_DRIVER_ATTRIBUTE_VALUE,
    throw_duplicate_driver_attribute_value: DUPLICATE_DRIVER_ATTRIBUTE_VALUE,
    throw_invalid_driver_attribute_key: INVALID_DRIVER_ATTRIBUTE_KEY
}