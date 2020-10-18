import express from 'express';
import { getNonSensitivePatients } from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

export default router;