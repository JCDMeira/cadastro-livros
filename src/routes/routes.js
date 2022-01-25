import express from 'express';
import userController from '../controllers/userController';

const globalRoutes = express.Router();

globalRoutes.post('/user/create', userController.createUser);
globalRoutes.get('/user/list', userController.listUsers);
globalRoutes.post('/user/login', userController.loginUser);

export default globalRoutes;
