import express from 'express';
import cors from 'cors';
import pingRouter from './routes/ping';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);

const port = 3001;
app.listen(port, () => console.log(`Listening on ${port}`));