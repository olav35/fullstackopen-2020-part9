import express from 'express';
import cors from 'cors';
import pingRouter from './routes/ping';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);

const port = 3001;
app.listen(port, () => console.log(`Listening on ${port}`));