## Restful API practice

### Get Started

#### Install
```
npm install
```

#### Run Test
```
npm run server
```

## Release

## Modifying schema to adapt for new requirements;

- Refactoring error handling utils;
- Add new subsource for drivers and passengers: `/drivers/:driver_id/payments` and `/passengers/:passenger_id/payments`

*Error Handling:**

Response Body

```json
{
  "status": 400,
  "statusTxt": "Bad Request",
  "errorCode": 1010,
  "errorMsg": "resouce not found",
  "timestamp": 1475176150652
}
```

Identify all possible error codes for each of the resources and consolidate them into a single table as below. Some
examples of possible errors are below.

1. Invalid resource name
2. Identifier not matching any resource instance
3. Invalid property name (given in POST)
4. Invalid value for a property (given in POST)


| Error Code | Error Message                   | Relevant Resources | Parameters           |
| ---------- | ------------------------------- | ------------------ | -------------------- |
| 1001       | Invalid model name              | All Resources      | `Resource Name`  |
| 1002       | Missing Required Attribute      | All Resources      | None                 |
| 1003       | Invaild Attribute value         | All Resources      | None                 |
| 1004       | Empty Body                      | All Resources      | None                 |
| 1005       | Invalid Format                  | All Resources      | None                 |
| 1006       | Invaild Attribute               | All Resources      | None                 |
| 1007       | Id should not be provided       | All Resources      | None                 |
| 1008       | Duplication Attribute           | All Resources      | None                 |
| 1009       | {0} not unique                  | All Resources      | `0 - Attribute Name` |
| 1010       | {0} resouce not found           | All Resources      | `0 - ObjectId`       |
1001	attribute required	All Resources	None
1002	attribute value's length is less than minlength	All Resources	None
1003	attribute value's length is longer than maxlength	All Resources	None
1004	invalid attribute {0} format	All Resources	{0} = email, phone
1005	invalid attribute value type	All Resources	None
1006	identifier not matching any resource instance	All Resources	None
1007	identifier should not provided when patching	All Resources	None
1008	Missing username when ask for token	All Resources	None
1009	Missing password when ask for token	All Resources	None
1010	Username does not match when ask for token	All Resources	None
1011	Password does not match when ask for token	All Resources	None
1012	Missing token	All Resources	None
1013	Invalid Token	All Resources	None
1014	Expired Token	All Resources	None
----

**Entities**

In the second part of the homework, you will implement all the errors listed in the above table into your code.
[This link](https://bitbucket.org/appcmusv/transportation-express-api) points to the code you can use to add your code.
Follow instructions in the README.md file to install this locally and add your code using your favorite editor.

Below are the fields you should add to the entities.

_drivers_

- firstName
- lastName
- emailAddress
- password (Used for POST only)
- addressLine1
- addressLine2
- city
- state
- zip
- phoneNumber

_passengers_

- firstName
- lastName
- emailAddress
- password (Used for POST only)
- addressLine1
- addressLine2
- city
- state
- zip
- phoneNumber

_cars_

- driver (reference)
- make
- model
- license
- doorCount

_rides_

- passenger (reference)
- driver (reference)
- car (reference)
- rideType (ECONOMY, PREMIUM, EXECUTIVE)
- startPoint  (latitude/longitude combination)
- endPoint (latitude/longitude combination)
- requestTime
- pickupTime
- dropOffTime
- status (REQUESTED, AWAITING_DRIVER, DRIVE_ASSIGNED, IN_PROGRESS, ARRIVED, CLOSED )
- fare
- route (series of latitude/longitude values)

_payments_

- accountType
- accountNumber
- expirationDate (optional, for passenger accounts only)
- nameOnAccount
- bank (optional, for driver accounts only)
