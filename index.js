const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const logger = require('morgan');
const BookRouter = require('./src/book/route');

dotenv.config();
const {
  DB_HOST,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CONNECTION,
  APP_PORT,
} = process.env;
const app = express();
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_CONNECTION,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err.message);
  });

app
  .use(logger('dev'))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use('/api/book', BookRouter)
  .listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`);
  });
