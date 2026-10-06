# Alert Map Project
## Small app for crud actions with alerts, and interctive map to use alerts


### To run:

- Add .env with your info
```
PORT=
MONGO_URI=
JWT_SECRET=
```

- Run server
```
cd server
```
```
npm install
```
```
node app
```
- Run front
```
cd ..
```
```
cd client
```
```
npm run dev
```


### DataBase - mongoDB

for db I chose mongodb, I have no connection between our entities, it much simple to store them with collections and documents, collection for alerts, and users (validations for schemas with zod in controllers)

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
to manage alerts and auths with react, I use api client (axios), that add every protect routes request the token (which is store with zustand every app loading or connecting to user), I wrote functions for every api call we need, and use it in useAlert or auth store, the router contain guest routes (to route all of non recognize users), protected routes (dashboard - only for recognize users) and admin routes (only for admin), the application initial auth store every refresh (for all app). 

