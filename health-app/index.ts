import express from 'express'
import calculateBmi from './calculateBmi'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if(!(height && weight)) { // Ensure height and weight where passed and are numbers (not NaN)
    res.status(400).send({
      error: 'malformatted parameters'
    })
  }

  res.send(calculateBmi(height, weight))
})

const port = 3001
app.listen(port, () => console.log(`Listening on ${port}`))