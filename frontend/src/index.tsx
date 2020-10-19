import React from 'react';
import ReactDOM from 'react-dom';
import { CoursePart } from './types';

const Header: React.FC<{courseName: string}> = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Content: React.FC<{courseParts: CoursePart[]}> = (props) => {
  return (
    <div>
      {
        props.courseParts.map((coursePart, index) => (
          <p key={index}>{coursePart.name} {coursePart.exerciseCount}</p>
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
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
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