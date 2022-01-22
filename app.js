import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
const routes = express.Router();

dotenv.config();

import mongoose from 'mongoose';

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

app.use(
  routes.get('/', (req, res) => {
    res.status(200).json({
      mensagem: 'ok',
    });
  }),
);

app.use((req, res) => {
  res.status(404).json({
    errors: {
      message: 'Page not found...',
    },
  });
});

export default app;
