import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import globalRoutes from './src/routes/routes';
import bodyParser from 'body-parser';

dotenv.config();

import mongoose from 'mongoose';
import userRoutes from './src/routes/Auth/user';
import booksRoutes from './src/routes/Auth/books';

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit('isConneted');
  })
  .catch((e) => console.log(e));

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/api/v1', globalRoutes);
// app.use(middleware);
app.use('/api/v1', userRoutes);
app.use('/api/v1', booksRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Page not found...' });
});

export default app;
