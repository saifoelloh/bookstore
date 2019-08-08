const response = require('../../utils/responses');
const service = require('./service');
const db = require('../../models');
const Book = db.Book;

module.exports = {
  index: async (req, res) => {
    try {
      const { message, data } = await service.index();

      return response.success(res, {
        code: 200,
        message,
        data,
      });
    } catch (e) {
      return response.failed(res, {
        code: 500,
        message,
        data,
      });
    }
  },
  create: async (req, res) => {
    const { data } = req.body;
    const book = await Book.create(data)
      .then(res => {
        console.log('Horay.. successfully creating new book');
        return res;
      })
      .catch(err => {
        return response.failed(
          res,
          {
            code: 500,
            message: 'Failed creating new book',
            data: null,
          },
          500,
        );
      });

    return response.success(
      res,
      {
        code: 201,
        message: 'Success creating book',
        data: book,
      },
      201,
    );
  },
  show: async (req, res) => {
    const book = await Book.findByPk(req.params.id)
      .then(res => {
        console.log('Horay.. your data has been founded');
        return res;
      })
      .catch(err => {
        return response.failed(res, {
          code: 500,
          message: 'Internal server error',
          data: e,
        });
      });

    if (book === null) {
      return response.failed(res, {
        code: 404,
        message: 'Your data not found',
        data: null,
      });
    }

    return response.success(res, {
      code: 200,
      message: 'Success getting detail of the book',
      data: book,
    });
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
