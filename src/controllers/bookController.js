import bookModel from '../models/bookModel';
import isValid from '../Helper/validate';

async function createBook({ body }, response) {
  try {
    const date = new Date().getTime();

    const { title, author, ...anotherBody } = body;

    const result = await bookModel.create({
      ...anotherBody,
      title: isValid(title).split(' '),
      author: isValid(author).split(' '),
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
      .find({}, { __v: 0 })
      .populate('created_by', { username: request.userId });

    result.forEach((book) => {
      book.title = book.title.join(' ');
      book.author = book.author.join(' ');
    });

    return response.status(200).json(result);
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function findBook({ query: { id } }, response) {
  try {
    const result = await bookModel.findById(id);

    return response.status(200).json(result);
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
