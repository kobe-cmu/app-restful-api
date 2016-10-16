var express = require('express');
var router = express.Router();

var Pay = require('../models/payments');
var errorHandling = require('../EH/errorHandling');

router.route('/payments')
    .get(function (req, res) {
        Pay.find(function (err, pays) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(pays);
            }
        });
    })

    .post(function (req, res) {
        var pay = new Pay(req.body);
        pay.save(function (err) {
            if (err) {
                //res.status(400).send(err);
                res.status(400).send(err = errorHandling.errorHandle(err));
            } else {
                //res.status(201).json({"message" : "pay Created", "pay_created" : pay});
                res.status(201).json(pay);
            }
        });
    });

/**
 * Express Route: /pays/:pay_id
 * @param {string} pay_id - Id Hash of pay Object
 */
router.route('/pays/:pay_id')
    /**
     * GET call for the pay entity (single).
     * @returns {object} the pay with Id pay_id. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .get(function (req, res) {
        Pay.findById(req.params.pay_id, function (err, pay) {
            if (err) {
                res.status(404).send(err = errorHandling.errorHandle(err)).end();
            } else {
                // if pay === null, err
                if (pay === null) {
                    res.status(404).end();
                } else {
                    res.json(pay);
                }
            }
        });
    })

    .patch(function (req, res) {
        Pay.findById(req.params.pay_id, function (err, pay) {
            if (err) {
                res.send(err = errorHandling.errorHandle(err));
                return;
                //res.status(400).send(err);
            } else {
                for (var attribute in req.body) {
                    pay[attribute] = req.body[attribute];
                }
                pay.save(function (err) {
                    if (err) {
                        res.send(err = errorHandling.errorHandle(err));
                        return;
                        //res.status(400).send(err);
                    } else {
                        res.json({ "message": "pay Updated", "pay_created": pay });
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the pay entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .delete(function (req, res) {
        // if pay id not found
        Pay.findById(req.params.pay_id, function (err, pay) {
            if (err) {
                res.status(404).send(err = errorHandling.errorHandle(err)).end();
            } else {
                Pay.remove({
                    _id: req.params.pay_id
                }, function (err, pay) {
                    if (err) {
                        res.status(404).send(err = errorHandling.errorHandle(err));
                    } else {
                        res.status(200).json({ "message": "pay Deleted" });
                    }
                });
            }
        });
    });

module.exports = router;