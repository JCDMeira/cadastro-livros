import UserModel from '../models/UserModel';

async function createUser({ body }, response) {
  try {
    const date = new Date().getTime();

    const result = await UserModel.create({
      ...body,
      created_at: date,
      updated_at: date,
    });

    return response.status(201).json(result);
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function listUsers(request, response) {
  try {
    const result = await UserModel.find({}, { username: 1 });

    return response.status(200).json(result);
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

async function editUser({ body, query: { id } }, response) {
  try {
    const result = await UserModel.findByIdAndUpdate(
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

async function deleteUser({ query: { id } }, response) {
  try {
    await UserModel.findByIdAndDelete(id);

    return response.status(200).json({ message: 'User successfully deleted' });
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

export default { createUser, listUsers, editUser, deleteUser };
