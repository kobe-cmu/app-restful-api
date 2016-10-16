var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var base64 = require("js-base64").Base64;

router.route('/sessions')
    .post(function (req, res) {
        /* Kept in database, start */
        var usernameDB = "Kobe";
        var clearPasswordDB = "12345";
        var hashPasswordDB = CryptoJS.HmacSHA1(clearPasswordDB, "pw").toString();
        /* Kept in database, end */

        // If password does not match
        var hashPassword = CryptoJS.HmacSHA1(req.body.password, "pw").toString();
        if (hashPassword !== hashPasswordDB) {
            res.status(404).json({
                "errorCode": 1011, // password does not match
                "errorMsg": "Password does not match",
                "statusCode": 404,
                "statusTxt": "Bad Request"
            }).end();
            return;
        }

        var username = req.body.username;
        var password = req.body.password;

        expiration = (parseInt(Date.now() / 1000) + 3600);

        // encryption
        clearString = username + ":" + expiration;
        hashString = CryptoJS.HmacSHA1(clearString, "APP");
        cryptString = CryptoJS.AES.encrypt(clearString + ":" + hashString, "Secret").toString(); //
        response = { token: base64.encode(cryptString) };
        res.status(200).json(response);
    });

module.exports = router;