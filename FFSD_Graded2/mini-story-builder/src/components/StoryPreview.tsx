import React from 'react';

interface StoryPreviewProps {
    story: string;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({ story }) => {
    return (
        <div className="story-preview">
            <h2>Story Preview</h2>
            <p>{story}</p>
        </div>
    );
};

export default StoryPreview;