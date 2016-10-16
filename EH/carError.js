/**
 * Error Control Script for cars
 * @author Kobe
 */

/* required attribute */
function MISSING_CAR_ATTRIBUTE(res, reqBody) {
    if(reqBody.year === undefined ||
       reqBody.maker === undefined ||
       reqBody.model === undefined ||
       reqBody.doorNum === undefined ||
       reqBody.passNum === undefined ||
       reqBody.license === undefined ||
       reqBody.driverID === undefined ||
       reqBody.insurance === undefined) {
        res.status(400).json({
            "errorCode": 2001,
            "errorMsg": "missing car attribute, required attribute: year, maker, model, doorNum, passNum, license, driverID, insurance",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* sttribute type error */
function WRONG_CAR_ATTRIBUTE_TYPE(res, reqBody) {
    if(typeof reqBody.license !==  'string' ||
       typeof reqBody.maker !== 'string' ||
       typeof reqBody.model !== 'string') {
        res.status(400).json({
            "errorCode": 2002,
            "errorMsg": "car attributes type error, these attributes required to be String type: license, maker, model",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* attribute value error
 * - year should be 4 bits
 * - doorNum should be no more than 8
 */
function INVALID_CAR_ATTRIBUTE_VALUE(res, reqBody) {
    if(reqBody.year.length > 4 ||
       reqBody.doorNum >= 8) {
        res.status(400).json({
            "errorCode": 2003,
            "errorMsg": "car attributes value is not valid: year should be 4 bits, doorNum no more than 8",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
}

/* duplicate attribute value error
 * - license should not duplicate
 */
function DUPLICATE_CAR_ATTRIBUTE_VALUE(res, reqBody, Car) {
    Car.find(function(err, cars) {
        var carObj = cars.filter(function(element) {
            return element.license == reqBody.license;
        })[0];
        if(carObj !== undefined) {
            res.status(400).json({
                "errorCode": 2004,
                "errorMsg": "car license attribute's value is duplicate",
                "statusCode": 400,
                "statusTxt": "Bad Request"
            })
        }
    })
}

/* Invalid attribute key
 * - Attribute Key is not invalid (not defined in database)
 */
function INVALID_CAR_ATTRIBUTE_KEY(res, reqBody, Car) {
    var car_attribute_list = ["year", "maker", "model", "doorNum", "passNum", "license", "driverID", "insurance"];
    Car.find(function(err, cars) {
        for (var attribute in reqBody) {
            if(car_attribute_list.indexOf(attribute) === -1) {
                res.status(400).json({
                    "errorCode": 2005,
                    "errorMsg": "invalid car attribute key",
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
    throw_missing_car_attribute: MISSING_CAR_ATTRIBUTE,
    throw_wrong_car_attribute_type: WRONG_CAR_ATTRIBUTE_TYPE,
    throw_invalid_car_attribute_value: INVALID_CAR_ATTRIBUTE_VALUE,
    throw_duplicate_car_attribute_value: DUPLICATE_CAR_ATTRIBUTE_VALUE,
    throw_invalid_car_attribute_key: INVALID_CAR_ATTRIBUTE_KEY
}