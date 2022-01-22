import UserModel from '../models/UserModel';

async function createUser({ body }, response) {
  try {
    const user = body;
    console.log(user);
    const result = await UserModel.create({
      ...user,
      created_at: new Date().getTime(),
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

export default { createUser, listUsers };
