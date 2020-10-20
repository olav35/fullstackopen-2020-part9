import express from 'express';
import cors from 'cors';
import pingRouter from './routes/ping';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const port = 3001;
app.listen(port, () => console.log(`Listening on ${port}`));