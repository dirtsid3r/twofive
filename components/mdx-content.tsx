'use client';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MediaContainer } from '@/app/components/ui/media-container';

// Add any components you want to use in MDX
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-6">
      <img className="rounded-lg w-full" {...props} />
    </div>
  ),
  video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => (
    <div className="my-6">
      <video
        className="rounded-lg w-full"
        controls
        {...props}
      />
    </div>
  ),
  // Add more components as needed
};

export function MDXContent({ code }: { code: string }) {
  return <MDXRemote source={code} components={components} />;
} 