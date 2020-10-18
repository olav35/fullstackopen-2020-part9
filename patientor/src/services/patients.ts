interface Patient {
  id: string,
  name: string,
  dateOfBirth?: string,
  ssn?: string,
  gender: string,
  occupation: string
}

type NonSensitivePatient = Omit<Patient, 'ssn'>;

const patients: Patient[] = [
  {
    "id": "d2773336-f723-11e9-8f0b-362b9e155667",
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": "male",
    "occupation": "New york city cop"
  },
  {
    "id": "d2773598-f723-11e9-8f0b-362b9e155667",
    "name": "Martin Riggs",
    "dateOfBirth": "1979-01-30",
    "ssn": "300179-77A",
    "gender": "male",
    "occupation": "Cop"
  },
  {
    "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
    "name": "Hans Gruber",
    "gender": "male",
    "occupation": "Technician"
  },
  {
    "id": "d2773822-f723-11e9-8f0b-362b9e155667",
    "name": "Dana Scully",
    "dateOfBirth": "1974-01-05",
    "ssn": "050174-432N",
    "gender": "female",
    "occupation": "Forensic Pathologist"
  },
  {
    "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
    "name": "Matti Luukkainen",
    "dateOfBirth": "1971-04-09",
    "ssn": "090471-8890",
    "gender": "male",
    "occupation": "Digital evangelist"
  }
];

export const getPatients = (): Patient[] => patients;
export const getNonSensitivePatients = (): NonSensitivePatient[] => (
  getPatients().map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }))
);