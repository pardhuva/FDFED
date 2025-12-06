import React from 'react';

const StudentDetails = ({ name, age, feedback }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      {feedback ? <p>Feedback: {feedback}</p> : <p>No feedback yet</p>}
    </div>
  );
};

export default StudentDetails;
