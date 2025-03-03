'use client';
import React from 'react';
import { useMDXComponent } from 'next-mdx-remote/rsc';
import { MediaContainer } from '@/app/components/ui/media-container';

// Add any components you want to use in MDX
const components = {
  h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mb-3" {...props} />,
  p: (props) => <p className="mb-4" {...props} />,
  img: (props) => (
    <MediaContainer 
      type="image" 
      src={props.src} 
      alt={props.alt} 
      caption={props.title} 
    />
  ),
  video: (props) => (
    <MediaContainer 
      type="video" 
      src={props.src} 
      caption={props.title} 
    />
  ),
  // Add more components as needed
};

export function MDXContent({ code }) {
  const MDXContent = useMDXComponent(code);
  return <MDXContent components={components} />;
} 