const db = require('../../models');
const Book = db.Book;

module.exports = {
  findAll: async () => {
    return Book.findAll();
  },
  create: async (data) => {
    const result = await Book.create(data).then((res) => {
      console.log("horay book has been created");
    }).catch((err) => {
      return err;
    });

    return result;
  },
  show: async (id) => {
    try {
      const result = await Book.findOne(id);
    } catch (e) {
      return e;
    }

    return result;
  },
  update: async (id, data) => {
    const book = await Book.findOne(id);
    if (book==null) return null;

    try {
      const result = await Book.update({
        title: data.title,
        description: data.description,
        published: data.published,
        authors: data.authors
      });
    } catch (e) {
      throw e;
    }

    return result;
  },
  destroy: async (id) => {
    const book = await Book.findOne(id);
    if (book===null) return null;

    try {
      const result = await Book.destroy({ where : { id: id, }, });
    } catch (e) {
      throw e;
    }

    return result;
  },
}
