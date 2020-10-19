import { v4 as uuidv4 } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import patients from '../../data/patients';

export const getPatients = (): Patient[] => patients;
export const getNonSensitivePatients = (): NonSensitivePatient[] => (
  getPatients().map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }))
);
export const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    ...entry,
    id: uuidv4()
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};