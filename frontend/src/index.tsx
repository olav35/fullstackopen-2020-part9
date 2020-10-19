import React from 'react';
import ReactDOM from 'react-dom';
import { CoursePart } from './types';

const Header: React.FC<{courseName: string}> = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part: React.FC<{coursePart: CoursePart}> = (props) => {
  switch(props.coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <b>{props.coursePart.name}</b> - {props.coursePart.exerciseCount}
          <p>{props.coursePart.description}</p>
          <br/>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <b>{props.coursePart.name}</b> - {props.coursePart.exerciseCount}
          <p>The group project count is {props.coursePart.groupProjectCount}</p>
          <br/>
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          <a href={props.coursePart.exerciseSubmissionLink}>
            <b>
              {props.coursePart.name}
            </b> 
          </a> - {props.coursePart.exerciseCount}
          <p>{props.coursePart.description}</p>
          <br/>
        </div>
      )
    case 'Exploring Emacs':
      return (
        <div>
          <b>{props.coursePart.name}</b> - {props.coursePart.exerciseCount}
          <p>{props.coursePart.description}</p>
          written by {props.coursePart.author}
          <br/>
        </div>
      )
    default:
      return assertNever(props.coursePart)
  }
}

const Content: React.FC<{courseParts: CoursePart[]}> = (props) => {
  return (
    <div>
      {
        props.courseParts.map((coursePart, index) => (
          <Part key={index} coursePart={coursePart}/>
        ))
      }
    </div>
  )
}

const Total: React.FC<{courseParts: CoursePart[]}> = (props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App: React.FC = () => {
  const courseName = 'Half Stack application development'

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: 'Exploring Emacs',
      exerciseCount: 0,
      description: 'The bestest emacs tutorial',
      author: 'Olav Fosse'
    }
  ]

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));