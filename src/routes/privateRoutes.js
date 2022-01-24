import express from 'express';
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';

const privateRoutes = express.Router();

privateRoutes.put('/user/edit', userController.editUser);
privateRoutes.delete('/user/delete', userController.deleteUser);

privateRoutes.post('/book/create', bookController.createBook);
privateRoutes.get('/books/list', bookController.listBooks);
privateRoutes.get('/book/find', bookController.findBook);
privateRoutes.put('/book/edit', bookController.editBook);
privateRoutes.delete('/book/delete', bookController.deleteBook);

export default privateRoutes;
