var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");
var base64 = require("js-base64").Base64;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://yichuan:12345@ds059306.mlab.com:59306/uber_cmu');
/** END: Express Server Configuration */

/** BEGIN: Express Routes Definition */
var router = require('./routes/router');
var cars = require('./routes/cars');
var drivers = require('./routes/drivers');
var passengers = require('./routes/passengers');
var rides = require('./routes/rides');
var payments = require('./routes/payments');
var sessions = require('./routes/sessions');
/** END: Express Routes Definition */

// decryption
app.use(function (req, res, next) {
    headers = req.headers;

    if (req.url != '/api/sessions') {
        if (headers.token === undefined) {
            res.status(404).json({
                'errorCode': '1012',
                'errorMessage': 'Missing token',
                'statusCode': '404'
            });
            return;
        } else {
            cryptedHash = base64.decode(headers.token);
            uncryptedHash = CryptoJS.AES.decrypt(cryptedHash, "Secret").toString(CryptoJS.enc.Utf8);

            try {
                username = uncryptedHash.split(':')[0];
                expiration = uncryptedHash.split(':')[1];
                clearString = username + ":" + expiration;
                HashedClearString = uncryptedHash.split(':')[2];

                reHashedClearString = CryptoJS.HmacSHA1(clearString, "APP");
                if (HashedClearString != reHashedClearString) {
                    res.status(404).json({
                        'errorCode': '1012',
                        'errorMessage': 'Invalid Token',
                        'statusCode': '404'
                    });
                    return;
                }
            } catch (error) {
                res.status(404).json({ 'errorCode': '1013', 'errorMessage': 'Invalid Token', 'statusCode': '404' });
                return;
            }
            if (expiration < parseInt(Date.now() / 1000)) {
                res.status(404).json({ 'errorCode': '1014', 'errorMessage': 'Expired Token', 'statusCode': '404' });
                return;
            } else {
                console.log("decrypt success!");
            }
        }
    }
    next();
});

app.use('/api', sessions);
app.use('/api', cars);
app.use('/api', drivers);
app.use('/api', passengers);
app.use('/api', rides);
app.use('/api', payments);
app.use('/api', router);

/** BEGIN: Express Server Start */
app.listen(port);
console.log('Service running on port ' + port);

module.exports = app;