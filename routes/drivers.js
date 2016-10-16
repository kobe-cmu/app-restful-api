var express = require('express');
var router = express.Router();

var Driver = require('../models/drivers');
var errorHandling = require('../EH/errorHandling');

router.route('/drivers')
    /**
     * GET call for the driver entity (multiple).
     * @returns {object} A list of drivers. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .get(function (req, res) {
        Driver.find(function (err, drivers) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(drivers);
            }
        });
    })
    /**
     * POST call for the driver entity
     */
    .post(function (req, res) {
        var driver = new Driver(req.body);

        driver.save(function (err) {
            if (err) {
                res.status(400).send(err = errorHandling.errorHandle(err));
                return;
                // res.status(400).send(err);
            } else {
                res.status(201).json(driver);
            }
        });
    });

/**
 * Express Route: /drivers/:driver_id
 * @param {string} driver_id - Id Hash of driver Object
 */
router.route('/drivers/:driver_id')
    /**
     * GET call for the driver entity (single).
     * @returns {object} the driver with Id driver_id. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .get(function (req, res) {
        Driver.findById(req.params.driver_id, function (err, driver) {
            if (err) {
                res.status(404).send(err = errorHandling.errorHandle(err));
            } else {
                // if driver === null, err
                if (driver === null) {
                    res.status(404).end();
                } else {
                    res.json(driver);
                }
            }
        });
    })
    /**
     * PATCH call for the driver entity (single).
     */
    .patch(function (req, res) {
        Driver.findById(req.params.driver_id, function (err, driver) {
            if (err) {
                res.send(err = errorHandling.errorHandle(err));
                return;
                //res.status(400).send(err);
            } else {
                for (var attribute in req.body) {
                    driver[attribute] = req.body[attribute];
                }

                driver.save(function (err) {
                    if (err) {
                        // res.status(400).send(err);
                        res.send(err = errorHandling.errorHandle(err));
                        return;
                    } else {
                        res.json({ "message": "Driver Updated", "driverUpdated": driver });
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the driver entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .delete(function (req, res) {
        // if driver id not found
        Driver.findById(req.params.driver_id, function (err, driver) {
            if (err) {
                res.status(404).send(err = errorHandling.errorHandle(err)).end();
            } else {
                Driver.remove({
                    _id: req.params.driver_id
                }, function (err, driver) {
                    if (err) {
                        res.status(404).send(err = errorHandling.errorHandle(err));
                        //CEC.throw_id_not_found(res, err);
                    } else {
                        res.status(200).json({ "message": "Driver Deleted" });
                    }
                });
            }
        })
    });

module.exports = router;