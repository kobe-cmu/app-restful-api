var express = require('express');
var router = express.Router();

var Car = require('../models/cars');
var errorHandling = require('../EH/errorHandling');


router.route('/cars')

    .get(function (req, res) {
        Car.find(function (err, cars) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(cars);
            }
        });
    })

    .post(function (req, res) {
        var car = new Car(req.body);
        car.save(function (err) {
            if (err) {
                //res.status(400).send(err);
                res.status(400).send(err = errorHandling.errorHandle(err));
            } else {
                //res.status(201).json({"message" : "Car Created", "car_created" : car});
                res.status(201).json(car);
            }
        });
    });

/**
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/cars/:car_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .get(function (req, res) {
        Car.findById(req.params.car_id, function (err, car) {
            if (err) {
                res.status(404).send(err = errorHandling.errorHandle(err)).end();
            } else {
                // if car === null, err
                if (car === null) {
                    res.status(404).end();
                } else {
                    res.json(car);
                }
            }
        });
    })
    /**
     * PATCH call for the car entity (single).
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .patch(function (req, res) {
        Car.findById(req.params.car_id, function (err, car) {
            //CEC.throw_id_provided(res, req.body);
            if (err) {
                res.send(err = errorHandling.errorHandle(err));
                return;
                //res.status(400).send(err);
                //CEC.throw_id_not_found(res, err);
                //CarEC.throw_invalid_car_attribute_key(res, req.body, Car);
            } else {
                for (var attribute in req.body) {
                    car[attribute] = req.body[attribute];
                }
                car.save(function (err) {
                    if (err) {
                        res.send(err = errorHandling.errorHandle(err));
                        return;
                        //res.status(400).send(err);
                    } else {
                        res.json({ "message": "Car Updated", "car_created": car });
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the car entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (400 Status Code)
     */
    .delete(function (req, res) {
        // if car id not found
        Car.findById(req.params.car_id, function (err, car) {
            if (err) {
                res.status(404).send(err = errorHandling.errorHandle(err)).end();
            } else {
                Car.remove({
                    _id: req.params.car_id
                }, function (err, car) {
                    if (err) {
                        res.status(404).send(err = errorHandling.errorHandle(err));
                        //CEC.throw_id_not_found(res, err);
                    } else {
                        res.status(200).json({ "message": "Car Deleted" });
                    }
                });
            }
        });
    });

module.exports = router;