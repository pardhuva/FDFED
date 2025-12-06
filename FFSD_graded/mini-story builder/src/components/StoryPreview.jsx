import React from 'react';

const StoryPreview = ({ character, setting, plot, templates }) => {
  const previews = templates.map((t, index) =>
    t.template
      .replace('[character]', character || '...')
      .replace('[setting]', setting || '...')
      .replace('[plot]', plot || '...')
  );

  return (
    <div>
      <h2>Live Story Preview</h2>
      <ul>
        {previews.map((story, index) => (
          <li key={index}>{story}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoryPreview;
