interface Character {
    name: string;
    role: string;
}

interface Setting {
    location: string;
    timePeriod: string;
}

interface PlotPoint {
    description: string;
}

interface Story {
    characters: Character[];
    setting: Setting;
    plotPoints: PlotPoint[];
}

interface Template {
    title: string;
    content: string;
}