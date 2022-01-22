import express from 'express';
import userController from '../controllers/userController';

const globalRoutes = express.Router();

globalRoutes.post('/user/create', userController.createUser);
globalRoutes.get('/user/list', userController.listUsers);

export default globalRoutes;
