import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const port = 3001;
app.listen(port, () => console.log(`Listening on ${port}`));