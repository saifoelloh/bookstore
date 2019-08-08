const db = require('../../models');
const Book = db.Book;

module.exports = {
  index: async () => {
    const result = await Book.findAll()
      .then(res => {
        return {
          data: res,
          message: 'Hooray.. successfully getting all your data',
        };
      })
      .catch(err => {
        throw new Error({
          message: 'Oops.. an error occurred while getting all data.',
          data: err,
        });
      });

    return result;
  },
  create: async data => {
    const result = await Book.create(data)
      .then(res => {
        console.log(res, 'ini hasil');
        return res;
      })
      .catch(err => {
        throw new Error('Oops.. there was an error when saving your data', err);
      });

    return result;
  },
  show: async id => {
    const result = await Book.findByPk(id)
      .then(res => res)
      .catch(err => {
        throw new Error(
          'Oops.. there was an error while getting your data. ',
          err,
        );
      });

    return result;
  },
  update: async (id, data) => {
    const book = await Book.findByPk(id);
    if (book === null) return null;

    const result = await Book.update({
      title: data.title,
      description: data.description,
      published: data.published,
      authors: data.authors,
    })
      .then(res => res)
      .catch(err => {
        throw new Error(
          `Oops.. there was an error while updating your daata ${book.title}.`,
          err,
        );
      });

    return result;
  },
  destroy: async id => {
    const result = await book
      .destroyByPk(id)
      .then(res => res)
      .catch(err => {
        throw new Error(
          `Oops.. there was an error while removing your data.`,
          err,
        );
      });

    return result;
  },
};
