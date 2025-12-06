import React, { useState, useEffect } from 'react';
import CharacterForm from './components/CharacterForm';
import SettingForm from './components/SettingForm';
import PlotForm from './components/PlotForm';
import StoryPreview from './components/StoryPreview';
import StoryList from './components/StoryList';
import templates from './templates.json';
import './App.css';

const App = () => {
  const [character, setCharacter] = useState('');
  const [setting, setSetting] = useState('');
  const [plot, setPlot] = useState('');
  const [storyTemplates, setStoryTemplates] = useState([]);
  const [generatedStories, setGeneratedStories] = useState([]);

  
  const last3DigitsRoll = 45;
  const MAX_STORIES = (last3DigitsRoll % 3) + 2; // N = 2

  useEffect(() => {
    setStoryTemplates(templates);

    const savedStories = localStorage.getItem('generatedStories');
    if (savedStories) {
      setGeneratedStories(JSON.parse(savedStories));
    }
  }, []);

  const generateStory = () => {
    if (storyTemplates.length === 0) return;

    const randomTemplate =
      storyTemplates[Math.floor(Math.random() * storyTemplates.length)];

    const newStory = randomTemplate.template
      .replace('[character]', character || 'Someone')
      .replace('[setting]', setting || 'somewhere')
      .replace('[plot]', plot || 'something happens');

    setGeneratedStories(prev => {
      const updated = [newStory, ...prev]; 
      const limited = updated.slice(0, MAX_STORIES); 
      localStorage.setItem('generatedStories', JSON.stringify(limited));
      return limited;
    });
  };

  return (
    <div className="App">
      <h1>📝 Mini Story Builder</h1>

      <CharacterForm character={character} onChange={setCharacter} />
      <SettingForm setting={setting} onChange={setSetting} />
      <PlotForm plot={plot} onChange={setPlot} />

      <StoryPreview
        character={character}
        setting={setting}
        plot={plot}
        templates={storyTemplates}
      />

      <button onClick={generateStory}>Generate Story</button>

      <StoryList stories={generatedStories} />
    </div>
  );
};

export default App;
