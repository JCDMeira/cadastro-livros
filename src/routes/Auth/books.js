import express from 'express';
import bookController from '../../controllers/bookController';
import Auth from '../../middlewares/auth';

const booksRoutes = express.Router();

booksRoutes.post('/book/create', Auth, bookController.createBook);
booksRoutes.get('/books/list', Auth, bookController.listBooks);
booksRoutes.get('/book/find', Auth, bookController.findBook);
booksRoutes.put('/book/edit', Auth, bookController.editBook);
booksRoutes.delete('/book/delete', Auth, bookController.deleteBook);

export default booksRoutes;
