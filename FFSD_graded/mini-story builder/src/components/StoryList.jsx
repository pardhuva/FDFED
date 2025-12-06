import React from 'react';

const StoryList = ({ stories }) => {
  if (!stories || stories.length === 0) return null;

  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <div key={index} className="story-item">
          {story}
        </div>
      ))}
    </div>
  );
};

export default StoryList;
