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

app.use((req, res, next) => {
  res.status(200).send({
    mensagem: 'ok',
  });
});

export default app;
