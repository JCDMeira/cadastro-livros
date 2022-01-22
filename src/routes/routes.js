import express from 'express';
import userController from '../controllers/userController';

const globalRoutes = express.Router();

globalRoutes.post('/user/create', userController.createUser);
globalRoutes.get('/user/list', userController.listUsers);
globalRoutes.put('/user/edit', userController.editUser);
globalRoutes.delete('/user/delete', userController.deleteUser);

export default globalRoutes;
