
/**
 * Error Control Script for passengers
 * @author Kobe
 */

function MISSING_PASSENGER_ATTRIBUTE(res, reqBody) {
    if(reqBody.firstName === undefined ||
       reqBody.lastName === undefined ||
       reqBody.dateOfBirth === undefined ||
       reqBody.username === undefined ||
       reqBody.emailAddress === undefined ||
       reqBody.password === undefined ||
       reqBody.addressLine1 === undefined ||
       reqBody.addressLine2 === undefined ||
       reqBody.city === undefined ||
       reqBody.state === undefined ||
       reqBody.zip === undefined ||
       reqBody.phoneNumber === undefined ) {
        res.status(400).json({
            "errorCode": 2001,
            "errorMsg": "missing passenger attribute",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* sttribute type error */
function WRONG_PASSENGER_ATTRIBUTE_TYPE(res, reqBody) {
    if(typeof reqBody.firstName !==  'string' ||
       typeof reqBody.lastName !== 'string' ||
       typeof reqBody.username !== 'string') {
        res.status(400).json({
            "errorCode": 2002,
            "errorMsg": "passenger attributes type error, these attributes required to be String type: firstname, lastname, username",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* attribute value error */
function INVALID_PASSENGER_ATTRIBUTE_VALUE(res, reqBody) {
    if(reqBody.year.length > 4 ||
       reqBody.doorNum >= 8) {
        res.status(400).json({
            "errorCode": 2003,
            "errorMsg": "passenger attributes value is not valid: year should be 4 bits, doorNum no more than 8",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* duplicate attribute value error */
function DUPLICATE_PASSENGER_ATTRIBUTE_VALUE(res, reqBody, Passenger) {
    Passenger.find(function(err, passengers) {
        var passengerObj1 = passengers.filter(function(element) {
            return element.emailAddress == reqBody.emailAddress;
        })[0];
        if(passengerObj1 !== undefined) {
            res.status(400).json({
                "errorCode": 2004,
                "errorMsg": "passenger email address attribute's value is duplicate",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            })
        }
        var passengerObj2 = passengers.filter(function(element) {
            return element.phoneNumber == reqBody.phoneNumber;
        })[0];
        if(passengerObj2 !== undefined) {
            res.status(400).json({
                "errorCode": 2004,
                "errorMsg": "passenger phone number attribute's value is duplicate",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            })
        }
    })
}

/* Invalid attribute key
 * - Attribute Key is not invalid (not defined in database)
 */
function INVALID_PASSENGER_ATTRIBUTE_KEY(res, reqBody, Passenger) {
    var passenger_attribute_list = ["firstName", "lastName", "dateOfBirth", "username", "emailAddress", "addressLine1", "addressLine2", "city", "state", "zip", "phoneNumber"];
    Passenger.find(function(err, passengers) {
        for (var attribute in reqBody) {
            if(passenger_attribute_list.indexOf(attribute) === -1) {
                res.status(400).json({
                    "errorCode": 2005,
                    "errorMsg": "invalid passenger attribute key",
                    "statusCode": 400,
                    "statusTxt": "Bad Request"
                })
            }
        }
    })
}

/* contain invalid property name */
// function

module.exports = {
    throw_missing_passenger_attribute: MISSING_PASSENGER_ATTRIBUTE,
    throw_wrong_passenger_attribute_type: WRONG_PASSENGER_ATTRIBUTE_TYPE,
    throw_invalid_passenger_attribute_value: INVALID_PASSENGER_ATTRIBUTE_VALUE,
    throw_duplicate_passenger_attribute_value: DUPLICATE_PASSENGER_ATTRIBUTE_VALUE,
    throw_invalid_passenger_attribute_key: INVALID_PASSENGER_ATTRIBUTE_KEY
}