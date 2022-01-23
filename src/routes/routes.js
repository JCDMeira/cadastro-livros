import express from 'express';
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';

const globalRoutes = express.Router();

globalRoutes.post('/user/create', userController.createUser);
globalRoutes.get('/user/list', userController.listUsers);
globalRoutes.put('/user/edit', userController.editUser);
globalRoutes.delete('/user/delete', userController.deleteUser);

globalRoutes.post('/book/create', bookController.createBook);
globalRoutes.get('/books/list', bookController.listBooks);
globalRoutes.get('/book/find', bookController.findBook);
globalRoutes.put('/book/edit', bookController.editBook);
globalRoutes.delete('/book/delete', bookController.deleteBook);

export default globalRoutes;
