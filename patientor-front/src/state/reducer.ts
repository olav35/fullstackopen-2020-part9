import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  } | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  } | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[]
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const patients = {
        ...state.patients,
        [action.payload.id]: action.payload
      };
      return {
	...state,
	patients
      };
    case "SET_DIAGNOSIS_LIST":
      const diagnosises = action.payload as Diagnosis[]
      return {
	...state,
	diagnosises
      }
    default:
      return state;
  };
};

export const setPatientList = (patients: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patients
});

export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient
});

export const updatePatient = (patient: Patient): Action => ({
  type: 'UPDATE_PATIENT',
  payload: patient
});

export const setDiagnosises = (diagnosises: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_LIST",
  payload: diagnosises
});
