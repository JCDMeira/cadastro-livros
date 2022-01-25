import express from 'express';
import userController from '../../controllers/userController';
import Auth from '../../middlewares/auth';

const userRoutes = express.Router();

userRoutes.put('/user/edit', Auth, userController.editUser);
userRoutes.delete('/user/delete', Auth, userController.deleteUser);
userRoutes.post('/user/logout', Auth, userController.logoutUser);

export default userRoutes;
