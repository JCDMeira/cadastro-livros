import UserModel from '../models/UserModel';

UserModel.create({
  name: 'testName',
})
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
