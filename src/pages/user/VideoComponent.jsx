import React, { useState } from 'react';

const VideoComponent = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(true); // Set initial state to true to show the video immediately

  // Path to the local or remote video
  const videoPath = '/videos/video1.mp4'; // Local file path or URL

  return (
    <div className="video-container mt-5">
      {/* Video Player */}
      {isVideoVisible && (
        <div className="video-player">
          <video width="600" autoPlay loop muted>
            <source src={videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;
