import express from 'express';
import { getNonSensitivePatients, addPatient } from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const patient = addPatient(req.body);
  res.send(patient);
});

export default router;