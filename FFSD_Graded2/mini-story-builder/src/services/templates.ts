import { Template } from '../types';

export const fetchTemplates = async (): Promise<Template[]> => {
    const response = await fetch('/data/templates.json');
    if (!response.ok) {
        throw new Error('Failed to fetch templates');
    }
    return response.json();
};