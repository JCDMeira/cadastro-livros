import http from 'http';
import app from './app';

const port = process.env.PORT || 3333;

const server = http.createServer(app);

app.on('isConneted', () => {
  server.listen(port, () => {
    console.log(
      `Server online, acesse ${port !== 3333 ? port : 'http://localhost:3333'}`,
    );
  });
});
