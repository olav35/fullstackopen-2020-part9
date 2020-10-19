import express from 'express';
import { getNonSensitivePatients, addPatient } from '../services/patients';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patient = addPatient(newPatient);
    res.send(patient);
  } catch(error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;