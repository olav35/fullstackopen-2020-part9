import express from 'express'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

const port = 3001
app.listen(port, () => console.log(`Listening on ${port}`))