# Mini Story Builder

## Overview
Mini Story Builder is a React application that allows users to create short stories by inputting characters, settings, and plot points. The application provides a user-friendly interface for story generation and offers real-time previews of the stories being created.

## Features
- Input forms for characters, settings, and plot points.
- Real-time story preview as users type.
- Fetching of story templates from a JSON file or API.
- State management using React hooks.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 5.6 or higher)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd mini-story-builder
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Project Structure
```
mini-story-builder
├── public
│   └── index.html
├── src
│   ├── index.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── Header.tsx
│   │   ├── CharacterForm.tsx
│   │   ├── SettingForm.tsx
│   │   ├── PlotPointsForm.tsx
│   │   ├── StoryGenerator.tsx
│   │   └── StoryPreview.tsx
│   ├── hooks
│   │   └── useStory.ts
│   ├── services
│   │   └── templates.ts
│   ├── data
│   │   └── templates.json
│   ├── styles
│   │   └── App.css
│   └── types
│       └── index.d.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.