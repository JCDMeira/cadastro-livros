import UserModel from '../models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const toJSON = (value) => JSON.parse(JSON.stringify(value));

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

async function loginUser(
  { body: { username, password }, query: { id } },
  response,
) {
  try {
    const user = await UserModel.findOne(
      { username },
      { __v: 0, created_at: 0, updated_at: 0 },
    ).select('+password');

    if (!user)
      return response
        .status(400)
        .json({ message: 'Invalid email and/or password ' });

    if (!(await bcrypt.compare(password, user.password)))
      return response
        .status(400)
        .json({ message: 'Invalid email and/or password ' });

    user.password = undefined;

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_ENCRYPT, {});

    return response.status(200).json({ ...toJSON(user), token });
  } catch ({ message }) {
    return response.status(400).json({ message });
  }
}

export default { createUser, listUsers, editUser, deleteUser, loginUser };
