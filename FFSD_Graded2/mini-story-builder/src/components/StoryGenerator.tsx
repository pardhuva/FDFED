import React, { useState } from 'react';
import CharacterForm from './CharacterForm';
import SettingForm from './SettingForm';
import PlotPointsForm from './PlotPointsForm';
import StoryPreview from './StoryPreview';

const StoryGenerator = () => {
    const [characters, setCharacters] = useState('');
    const [setting, setSetting] = useState('');
    const [plotPoints, setPlotPoints] = useState('');
    const [story, setStory] = useState('');

    const handleCharacterChange = (newCharacters) => {
        setCharacters(newCharacters);
        generateStory(newCharacters, setting, plotPoints);
    };

    const handleSettingChange = (newSetting) => {
        setSetting(newSetting);
        generateStory(characters, newSetting, plotPoints);
    };

    const handlePlotPointsChange = (newPlotPoints) => {
        setPlotPoints(newPlotPoints);
        generateStory(characters, setting, newPlotPoints);
    };

    const generateStory = (characters, setting, plotPoints) => {
        if (characters && setting && plotPoints) {
            setStory(`Once upon a time in ${setting}, ${characters} faced challenges: ${plotPoints}.`);
        } else {
            setStory('');
        }
    };

    return (
        <div>
            <CharacterForm onCharacterChange={handleCharacterChange} />
            <SettingForm onSettingChange={handleSettingChange} />
            <PlotPointsForm onPlotPointsChange={handlePlotPointsChange} />
            <StoryPreview story={story} />
        </div>
    );
};

export default StoryGenerator;