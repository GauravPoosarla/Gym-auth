const express = require('express');
const { createClient } = require('redis');

const userController = require('./src/controllers/userController');
const userRoute = require('./src/routes/userRoute');
const gymRoute = require('./src/routes/gymRoute');

global.redisClient = createClient();

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.connect().then(() => {
  console.log('Redis connected');
}).catch((err) => {
  console.log('Redis error: ', err);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoute);
app.use('/session', gymRoute);

app.listen(3000, () => {
  console.log('Gym app listening on port 3000!');
});