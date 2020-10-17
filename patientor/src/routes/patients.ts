import express from 'express';
import { getNonSensitivePatients } from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

export default router;