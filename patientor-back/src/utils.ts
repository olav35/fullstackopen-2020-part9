/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseName = (name: any): string => {
  if(!(name && isString(name))) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if(!(isString(dateOfBirth) && isDate(dateOfBirth))) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }

  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  // Verifying that they are "valid" is overkill 
  if(!(ssn && isString(ssn))) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if(!(occupation && isString(occupation))) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
  let dateOfBirth;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if(object.dateOfBirth) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    dateOfBirth = parseDateOfBirth(object.dateOfBirth);
  }

  let ssn;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if(object.ssn) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ssn = parseSsn(object.ssn);
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    name: parseName(object.name),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    dateOfBirth, // optional
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ssn, // optional
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    gender: parseGender(object.gender),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

const parseDescription = () => (description: any): string => {
  if(!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
};

const parseDate = (date: any): string => {
  if(!(isString(date) && isString(date))) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSpecialist = () => (specialist: any): string => {
  if(!specialist || !isSpecialist(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }

  return specialist;
};

const parseDiagnosisCodes = () => (diagnosisCodes: any): string => {
  if(!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis scodes: ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

export const toNewEntry = (object: any): NewEntry => {
  // Base fields
  let description = parseDescription(object.description);
  let date = parseDate(object.date);
  let specialist = parseSpecialist(object.specialist);
  let diagnosisCodes;
  if(object.diagnosisCodes) {
    diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }


  // Type specific fields
  let type = parseType(object.type);
  let typeFields = {}

  switch(type) {
    case 'HealthCheck':
      typeFields.healthCheckRating = parseHealthCheckRating(object.parseHealthCheckRating);
      break;
    default:
      throw new Error('Unsupported type');
  }

  return {
    description,
    date,
    specialist,
    diagnosisCodes,
    ...typeFields
  }
}
