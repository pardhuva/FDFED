import React, { useState } from 'react';

const SettingForm = ({ onSettingChange }) => {
    const [setting, setSetting] = useState('');

    const handleChange = (event) => {
        setSetting(event.target.value);
        onSettingChange(event.target.value);
    };

    return (
        <div>
            <h2>Setting Input</h2>
            <input
                type="text"
                value={setting}
                onChange={handleChange}
                placeholder="Enter the setting for your story"
            />
        </div>
    );
};

export default SettingForm;