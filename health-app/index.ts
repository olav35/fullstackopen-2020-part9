import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(!(height && weight)) { // Ensure height and weight where passed and are numbers (not NaN)
    res.status(400).send({
      error: 'malformatted parameters'
    });
  } else {
    res.send(calculateBmi(height, weight));
  }
});

interface Request {
  body: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises: any
  }
}

app.post('/exercises', (req: Request, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target } = req.body;

  if(target === undefined || daily_exercises === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  if(!Array.isArray(daily_exercises) ||
     daily_exercises.length === 0 ||
     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
     [target, ...daily_exercises].some(a => typeof a !== 'number')) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  return res.send(calculateExercises(daily_exercises, target));
});

const port = 3001;
app.listen(port, () => console.log(`Listening on ${port}`));