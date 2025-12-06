import React, { useState } from 'react';
import StudentDetails from './StudentDetails';

const StudentCard = ({ name, age, feedback, onGiveFeedback }) => {
  const [tempFeedback, setTempFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGiveFeedback(name, tempFeedback);
    setTempFeedback('');
  };

  return (
    <div>
      <StudentDetails name={name} age={age} feedback={feedback} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tempFeedback}
          onChange={(e) => setTempFeedback(e.target.value)}
          placeholder="Enter feedback"
        />
        <button type="submit">Submit Feedback</button>
      </form>

      <hr />
    </div>
  );
};

export default StudentCard;
