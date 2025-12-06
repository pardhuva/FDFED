import React from 'react';

const PlotForm = ({ plot, onChange }) => {
  return (
    <div>
      <label>Plot:</label>
      <input
        type="text"
        value={plot}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter plot"
      />
    </div>
  );
};

export default PlotForm;
