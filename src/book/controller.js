const response = require('../../utils/responses');
const service = require('./service');
const db = require('../../models');
const Book = db.Book;

module.exports = {
  index: async (req, res) => {
    try {
      const result = await service.index();

      return response.success(res, result);
    } catch (e) {
      return response.failed(res, e);
    }
  },
  create: async (req, res) => {
    try {
      const { data } = req.body;
      const result = await service.store(data);

      return response.success(res, result);
    } catch (e) {
      return response.failed(res, e);
    }
  },
  show: async (req, res) => {
    try {
      const result = await service.show(req.params.id);

      return response.success(res, result);
    } catch (e) {
      return response.failed(res, e);
    }
  },
  update: async (req, res) => {
    try {
      const { data } = req.body;
      const result = await service.update(req.params.id, data);

      return response.success(res, result);
    } catch (e) {
      return response.failed(res, e);
    }
  },
  destroy: async (req, res) => {
    try {
      const result = await service.destroy(req.params.id);

      return response.success(res, result);
    } catch (e) {
      return response.failed(res, e);
    }
  },
};
