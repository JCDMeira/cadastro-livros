import bookModel from '../models/bookModel';

async function createBook({ body }, response) {
  try {
    const date = new Date().getTime();

    const result = await bookModel.create({
      ...body,
      created_at: date,
      updated_at: date,
    });

    return response.status(201).json(result);
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function listBooks(request, response) {
  try {
    const result = await bookModel.find({}, { __v: 0 });

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
    const result = await bookModel.findByIdAndUpdate(
      id,
      {
        ...body,
        updated_at: new Date().getTime(),
      },
      { returnDocument: 'after' },
    );

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
