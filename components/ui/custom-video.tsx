"use client";

import React, { useEffect, useState } from "react";

interface CustomVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function CustomVideo({
  src,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
}: CustomVideoProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <video
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={className}
      data-video={mounted ? "1" : "0"}
    />
  );
} 