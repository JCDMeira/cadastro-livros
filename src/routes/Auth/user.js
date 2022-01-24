import express from 'express';
import userController from '../../controllers/userController';

const userRoutes = express.Router();

userRoutes.put('/user/edit', userController.editUser);
userRoutes.delete('/user/delete', userController.deleteUser);

export default userRoutes;
