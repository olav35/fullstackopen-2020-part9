import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { apiBaseUrl } from "../constants";
import { updatePatient } from '../state/reducer';
import { setDiagnosises } from '../state/reducer';


const EntryDetails: any = (props: {entry: any}) => {
  /* include the Entry's details with a new component that shows rest of the information of the patients entries distinguishing different types from each other. */
  switch(props.entry.type) {
    case 'Hospital':
      return (
	<div>
	  type: hospital<br/>
	  {props.entry.date} {props.entry.criteria}
	</div>
      )
    case 'OccupationalHealthcare':
      return (
	<div>
	  type: occupational healthcare<br/>
	  employer: {props.entry.employerName}<br/>
	{
	  props.entry.sickLeave ? (
	    <div>
	      {props.entry.sickLeave.startDate} -> {props.entry.sickLeave.endDate}
	    </div>
	  ): null
	}
	</div>
      )
    case 'HealthCheck':
      return (
	<div>
	  type: health check<br/>
	  health check rating: {props.entry.healthCheckRating}
	</div>
      )
    default:
      console.log('pre')
      console.log(props.entry.type)
      return null
  }
}

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

    const fetchDiagnosises = async () => {
      try {
	const { data: diagnosises } = await axios.get(`${apiBaseUrl}/diagnoses`)
	dispatch(setDiagnosises(diagnosises))
      } catch(error) {
	console.error(error.message)
      }
    }
    fetchDiagnosises()
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
	  return entries.map(entry =>
	    (
	      <div key={entry.id}>
		<span>{entry.date} {entry.description}</span>
		{
		  entry.diagnosisCodes ? (
		    <ul>
		      {
			entry.diagnosisCodes.map(code => (
			  <li>
			    {
			      code
			    }
			    {
			      (() => {
				const d = state.diagnosises.find(d => d.code === code)
				return d ? ' '+d.name : null
			      })()
			    }
			  </li>))
		      }
		    </ul>
		  ) : null
		}
		<EntryDetails entry={entry}/>
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
