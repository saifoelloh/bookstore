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
    const { data } = req.body;

    const book = await Book.findByPk(req.params.id);
    if (book === null) {
      return response.failed(res, {
        code: 404,
        message: 'Data not found',
        data: null,
      });
    }

    const result = await book
      .update(data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return response.failed(res, {
          code: 500,
          message: 'Internal server error',
          data: null,
        });
      });

    return response.success(res, {
      code: 200,
      message: 'Succesfully updating your data',
      data: result,
    });
  },
  destroy: async (req, res) => {
    const result = await Book.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        return response.failed(res, {
          code: 500,
          message: 'Internal server error',
          data: null,
        });
      });

    return response.success(res, {
      code: 200,
      message: 'Your data has been deleted',
      data: result,
    });
  },
};
