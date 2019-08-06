const express = require('express');
const controller = require('./controller');

const BookRouter = express.Router();

BookRouter
  .get('/', controller.index)
  .post('/', controller.create)
  .get('/:id', controller.show)
  .put('/:id', controller.update)
  .delete('/:id', controller.destroy);

module.exports = BookRouter;
