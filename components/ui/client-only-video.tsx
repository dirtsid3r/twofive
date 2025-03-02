"use client";

import React, { useEffect, useState } from "react";

interface ClientOnlyVideoProps {
  src: string;
  className?: string;
}

export default function ClientOnlyVideo({ src, className }: ClientOnlyVideoProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    // Return a placeholder with the same dimensions during SSR
    return <div className={className} style={{ aspectRatio: '16/9' }} />;
  }
  
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      className={className}
    />
  );
} 