import React, { useState } from 'react';
import StudentCard from './StudentCard';

const StudentList = () => {
  const [students] = useState([
    { name: "Pardhu", age: 13 },
    { name: "JK", age: 14 },
    { name: "Hope", age: 16 }
  ]);

  const [feedbacks, setFeedbacks] = useState({});

  const handleGiveFeedback = (name, feedbackText) => {
    setFeedbacks((prev) => ({ ...prev, [name]: feedbackText }));
  };

  return (
    <div>
      <h2>Student List</h2>
      {students.map((student) => (
        <StudentCard
          key={student.name}
          name={student.name}
          age={student.age}
          feedback={feedbacks[student.name]}
          onGiveFeedback={handleGiveFeedback}
        />
      ))}
    </div>
  );
};

export default StudentList;
