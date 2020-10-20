import express from 'express';
import diagnonses from '../services/diagnoses';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnonses);
});

export default router;