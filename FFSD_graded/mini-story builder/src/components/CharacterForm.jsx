import React from 'react';

const CharacterForm = ({ character, onChange }) => {
  return (
    <div>
      <label>Character:</label>
      <input
        type="text"
        value={character}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter character name"
      />
    </div>
  );
};

export default CharacterForm;
