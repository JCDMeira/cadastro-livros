import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const mongoose = require('mongoose');

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

app.use('/', (req, res) => {
  res.status(200).send({
    mensagem: 'ok',
  });
});

app.use((req, res, next) => {
  const error = new Error('Page not found...');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  return res.json({
    errors: {
      message: error.message,
    },
  });
});

export default app;
