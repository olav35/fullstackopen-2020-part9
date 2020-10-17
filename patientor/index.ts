import express from 'express';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const port = 3001;
app.listen(port, () => console.log(`Listening on ${port}`));