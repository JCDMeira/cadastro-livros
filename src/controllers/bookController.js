import bookModel from '../models/bookModel';
import isValid from '../Helper/validate';

async function createBook({ body, userId }, response) {
  try {
    const date = new Date().getTime();

    const { title, author, ...anotherBody } = body;

    const result = await bookModel.create({
      ...anotherBody,
      title: isValid(title).trim().split(' '),
      author: isValid(author).trim().split(' '),
      created_by: userId,
      created_at: date,
      updated_at: date,
    });

    result.title = result.title.join(' ');
    result.author = result.author.join(' ');

    return response.status(201).json(result);
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function listBooks(request, response) {
  try {
    const result = await bookModel
      .find({ created_by: request.userId }, { __v: 0 })
      .populate('created_by');

    result.forEach((book) => {
      book.title = book.title.join(' ');
      book.author = book.author.join(' ');
      book.created_by.password = undefined;
      book.created_by.__v = undefined;
      book.created_by.created_at = undefined;
      book.created_by.updated_at = undefined;
    });

    return response.status(200).json(result);
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function findBook({ query: { id, search }, userId }, response) {
  try {
    if (id) {
      return response.status(200).json(await bookModel.findById(id));
    }
    if (search) {
      const words = search.trim().split(' ');

      const resultSearchTitle = await bookModel.find({
        title: { $all: words },
        created_by: userId,
      });

      const resultSearchAuthor = await bookModel.find({
        author: { $all: words },
        _id: { $ne: resultSearchTitle._id },
        created_by: userId,
      });

      return response
        .status(200)
        .json(Object.assign(resultSearchTitle, resultSearchAuthor));
    }

    return response.status(200).json(await bookModel.find());
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function editBook({ body, query: { id } }, response) {
  try {
    const { title, author, synopsis, photo } = body;
    const result = await bookModel.findByIdAndUpdate(
      id,
      {
        title: isValid(title).split(' '),
        author: isValid(author).split(' '),
        synopsis: synopsis,
        photo: photo,
        updated_at: new Date().getTime(),
      },
      { returnDocument: 'after' },
    );

    result.title = result.title.join(' ');
    result.author = result.author.join(' ');

    return response.status(200).json(result);
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function deleteBook({ query: { id } }, response) {
  try {
    await bookModel.findByIdAndDelete(id);

    return response.status(200).json({ message: 'Book sucessfully deleted' });
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

export default { createBook, listBooks, findBook, editBook, deleteBook };
