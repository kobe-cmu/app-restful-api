/**
 * Error Control Script for general error
 * @author Kobe
 */

function EMPTY_REQUEST_BODY(res, reqBody) {
    if(Object.keys(reqBody).length === 0) {
        res.status(400).json({
            "errorCode": 1001,
            "errorMsg": "request body is empty",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
};

/* id should not be provided */
function ID_PROVIDED(res, reqBody) {
    if(reqBody.id !== undefined) {
        res.status(400).json({
            "errorCode": 1002,
            "errorMsg": "ID should not be provided",
            "statusCode": 400,
            "statusTxt": "Bad Request"
        })
    }
};

/* Identifier not match any source */
function IDENTIFIER_NOT_MATCH_ANY_SOURCE(res, err) {
    res.status(500).send(err={
        "errorCode": 1003,
        "errorMsg": "Identifier not match any source",
        "statusCode": 500,
        "statusTxt": "Bad Request"
    })
};


module.exports = {
    throw_empty_request_body: EMPTY_REQUEST_BODY,
    throw_id_provided: ID_PROVIDED,
    throw_id_not_found: IDENTIFIER_NOT_MATCH_ANY_SOURCE
};