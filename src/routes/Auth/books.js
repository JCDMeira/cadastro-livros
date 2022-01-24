import express from 'express';
import bookController from '../../controllers/bookController';

const booksRoutes = express.Router();

booksRoutes.post('/book/create', bookController.createBook);
booksRoutes.get('/books/list', bookController.listBooks);
booksRoutes.get('/book/find', bookController.findBook);
booksRoutes.put('/book/edit', bookController.editBook);
booksRoutes.delete('/book/delete', bookController.deleteBook);

export default booksRoutes;
