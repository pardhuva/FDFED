import React, { useState } from 'react';

const CharacterForm = ({ onAddCharacter }) => {
    const [characterName, setCharacterName] = useState('');

    const handleInputChange = (event) => {
        setCharacterName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (characterName.trim()) {
            onAddCharacter(characterName);
            setCharacterName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Character Name:
                <input
                    type="text"
                    value={characterName}
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Add Character</button>
        </form>
    );
};

export default CharacterForm;