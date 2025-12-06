import React from 'react';

const SettingForm = ({ setting, onChange }) => {
  return (
    <div>
      <label>Setting:</label>
      <input
        type="text"
        value={setting}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter setting"
      />
    </div>
  );
};

export default SettingForm;
