import React, { useState } from 'react';
import Header from './components/Header';
import CharacterForm from './components/CharacterForm';
import SettingForm from './components/SettingForm';
import PlotPointsForm from './components/PlotPointsForm';
import StoryGenerator from './components/StoryGenerator';
import StoryPreview from './components/StoryPreview';

const App = () => {
    const [characters, setCharacters] = useState<string[]>([]);
    const [settings, setSettings] = useState<string[]>([]);
    const [plotPoints, setPlotPoints] = useState<string[]>([]);
    const [story, setStory] = useState<string>('');

    const handleCharacterChange = (newCharacters: string[]) => {
        setCharacters(newCharacters);
    };

    const handleSettingChange = (newSettings: string[]) => {
        setSettings(newSettings);
    };

    const handlePlotPointChange = (newPlotPoints: string[]) => {
        setPlotPoints(newPlotPoints);
    };

    const generateStory = () => {
        const combinedStory = `Once upon a time, ${characters.join(', ')} found themselves in ${settings.join(', ')}. The plot thickened with ${plotPoints.join(', ')}.`;
        setStory(combinedStory);
    };

    return (
        <div className="App">
            <Header />
            <CharacterForm onCharacterChange={handleCharacterChange} />
            <SettingForm onSettingChange={handleSettingChange} />
            <PlotPointsForm onPlotPointChange={handlePlotPointChange} />
            <StoryGenerator generateStory={generateStory} />
            <StoryPreview story={story} />
        </div>
    );
};

export default App;