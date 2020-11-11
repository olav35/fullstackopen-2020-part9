import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { apiBaseUrl } from "../constants";
import { updatePatient } from '../state/reducer';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    if(state.patients[id] && state.patients[id].entries) {
      return;
    }

    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get(`${apiBaseUrl}/patients/${id}`);
        dispatch(updatePatient(patient));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPatient();
  }, [dispatch, id, state.patients]);

  return state.patients[id] ? (
    <div>
      <h2>
        {state.patients[id].name}
      </h2>
      <p>
        gender: {state.patients[id].gender}
      </p>
      <p>
        occupation: {state.patients[id].occupation}
      </p>
      {
        // optional field
        state.patients[id].ssn && (
          <p>ssn: {state.patients[id].ssn}</p>
        )
      }
      {
        // optional field
        state.patients[id].dateOfBirth && (
          <p>date of birth: {state.patients[id].dateOfBirth}</p>
        )
      }
      <h3>Entries</h3>
      {
	/* date, description and diagnose  */
        state.patients[id].entries ? (() => {
          const entries = state.patients[id].entries as Entry[];
	  console.log(entries)
	  return entries.map(entry => (
	    <div>
	      <span>{entry.date} {entry.description}</span>
	      {
		entry.diagnosisCodes ? (
		  <ul>
		    {
		    entry.diagnosisCodes.map(code => (<li>{code}</li>))
		    }
		  </ul>
		) : null
	      }
	    </div>
	  ))
        })() : (() => {
          return <p>loading entries</p>;
        })()
      }
    </div>
  ) : null;
};

export default PatientPage;
