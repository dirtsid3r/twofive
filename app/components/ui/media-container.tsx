import React from 'react';
import Image from 'next/image';

interface MediaContainerProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
}

export function MediaContainer({ 
  type, 
  src, 
  alt = '', 
  caption, 
  className = '' 
}: MediaContainerProps) {
  return (
    <div className={className}>
      <div className="media-container">
        {type === 'image' ? (
          <div className="relative w-full aspect-video">
            <Image 
              src={src} 
              alt={alt} 
              fill 
              className="media-content object-cover"
            />
          </div>
        ) : (
          <video 
            src={src} 
            className="media-content" 
            controls={false}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
      {caption && <p className="media-caption">{caption}</p>}
    </div>
  );
} 