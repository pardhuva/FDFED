import { useState, useEffect } from 'react';
import { fetchTemplates } from '../services/templates';

const useStory = () => {
    const [characters, setCharacters] = useState<string[]>([]);
    const [settings, setSettings] = useState<string[]>([]);
    const [plotPoints, setPlotPoints] = useState<string[]>([]);
    const [story, setStory] = useState<string>('');
    const [templates, setTemplates] = useState<string[]>([]);

    useEffect(() => {
        const loadTemplates = async () => {
            const fetchedTemplates = await fetchTemplates();
            setTemplates(fetchedTemplates);
        };
        loadTemplates();
    }, []);

    const generateStory = () => {
        const characterList = characters.join(', ');
        const settingList = settings.join(', ');
        const plotList = plotPoints.join(', ');

        const newStory = `Once upon a time, ${characterList} found themselves in ${settingList}. They faced the following challenges: ${plotList}.`;
        setStory(newStory);
    };

    return {
        characters,
        setCharacters,
        settings,
        setSettings,
        plotPoints,
        setPlotPoints,
        story,
        generateStory,
        templates,
    };
};

export default useStory;