"use client";

import React, { useEffect, useState } from "react";

function VideoCard({ /* props */ }) {
  const [dataVideo, setDataVideo] = useState("0");
  
  useEffect(() => {
    // Set the attribute on the client side only after component mounts
    setDataVideo(Math.random() > 0.5 ? "1" : "0");
  }, []);

  return (
    <div data-video={dataVideo}>
      {/* video content */}
    </div>
  );
}

export default VideoCard; 