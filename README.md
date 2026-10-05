# Alert Map Project
## Small app for crud actions with alerts, and interctive map to use alerts


### DataBase - mongoDB
for db i chose mongodb, 

### Endpoints

GET
/api/alerts
200 - Even if alerts are empty, endpoint will always return 200 with an array

GET
/api/alerts/:id
404 - if alert not found, 200 - json with alert

POST
/api/alerts
400 - if any of fields in body invalid, 201 - json with created alert

DELETE
/api/alerts/:id
404 - if alert not found, 200 - json with deleted alert

PUT
api/alerts/:id/
404 - if alert not found, 400 - if there is no fields or any of fields are invalid, 200 - json with updated alert


### Validation
in post new alert - I use zod to validate any of fields is in correct type
in put existing alert - I check if there is at least valid field

### Frontend
to manage adding new alert, 

