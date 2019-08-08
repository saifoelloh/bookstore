const db = require('../../models');
const Book = db.Book;

module.exports = {
  index: async () => {
    const result = await Book.findAll()
      .then(res => {
        return {
          code: 200,
          data: res,
          message: 'Hooray.. successfully getting all your data',
        };
      })
      .catch(err => {
        throw new Error({
          code: 500,
          message: 'Oops.. an error occurred while getting all data.',
          data: err,
        });
      });

    return result;
  },
  store: async data => {
    const result = await Book.create(data)
      .then(res => {
        return {
          code: 201,
          message: 'Hooray.. your book has been saved',
          data: res,
        };
      })
      .catch(err => {
        throw new Error({
          code: 500,
          message: 'Oops.. there was an error when saving your data',
          data: err,
        });
      });

    return result;
  },
  show: async id => {
    const result = await Book.findByPk(id)
      .then(res => {
        return {
          code: 200,
          message: 'Horay.. your data has been founded',
          data: res,
        };
      })
      .catch(err => {
        throw new Error({
          code: 500,
          message: 'Oops.. there was an error while getting your data. ',
          data: err,
        });
      });

    return result;
  },
  update: async (id, data) => {
    const book = await Book.findByPk(id);
    if (book === null)
      return {
        code: 404,
        message: 'Oops.. your data not found',
        data: null,
      };

    const result = await Book.update({
      title: data.title,
      description: data.description,
      published: data.published,
      authors: data.authors,
    })
      .then(res => {
        return {
          code: 202,
          message: 'Hooray.. successfully updating your data.',
          data: res,
        };
      })
      .catch(err => {
        throw new Error({
          code: 500,
          message: `Oops.. there was an error while updating your daata ${book.title}.`,
          data: err,
        });
      });

    return result;
  },
  destroy: async id => {
    const book = await Book.findByPk(id);
    if (book === null)
      return {
        code: 404,
        message: 'Oops.. your data not found',
        data: null,
      };

    const result = await book
      .destroy()
      .then(res => {
        return {
          code: 200,
          message: 'Succesfully removing your data.',
          data: res,
        };
      })
      .catch(err => {
        throw new Error({
          code: 500,
          message: `Oops.. there was an error while removing your data.`,
          data: err,
        });
      });

    return result;
  },
};
