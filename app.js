import express from 'express';

const app = express();

app.use((req, res, next) => {
  res.status(200).send({
    mensagem: 'ok',
  });
});

export default app;
