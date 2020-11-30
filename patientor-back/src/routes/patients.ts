import express from 'express';
import { getNonSensitivePatients, addPatient, getPatientByID, addEntry } from '../services/patients';
import { toNewPatient, toNewEntry } from '../utils';

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
interface Request {
  params: {
    id: string
  }
}

// TODO HealthCheckEntry
// TODO OccupationalHealthCareEntry
// TODO HospitalEntry
router.post('/:id/entries', (req, res) => {
  try {
    const patient = getPatientByID(req.params.id);
    const newEntry = toNewEntry(req.body);
    const entry = addEntry(patient, newEntry);
    res.send(entry);
  } catch(error) {
    res.status(400).send(error.message);
  }
  console.log(req.params.id);
  console.log(req.body);
});

router.get('/:id', (req: Request, res) => {
  res.send(getPatientByID(req.params.id));
});

export default router;
