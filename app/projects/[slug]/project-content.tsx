'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, LinkIcon, CalendarIcon, GithubIcon } from 'lucide-react';
import Image from 'next/image';
import { MediaContainer } from '@/app/components/ui/media-container';

export interface ProjectContentProps {
  data: {
    title: string;
    description: string;
    date: string;
    image?: string;
    technologies?: string[];
    github?: string;
    website?: string;
    liveUrl?: string;
  };
  contentHtml: string;
}

export default function ProjectContent({ data, contentHtml }: ProjectContentProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Process the HTML to replace img tags with MediaContainer
  const processedHtml = contentHtml.replace(
    /<img\s+src="([^"]+)"\s+alt="([^"]*)"\s+title="([^"]*)"\s*\/?>/g,
    (match, src, alt, title) => {
      return `<div>
        <div class="media-container">
          <div class="relative w-full aspect-video">
            <img src="${src}" alt="${alt}" class="media-content object-cover" />
          </div>
        </div>
        ${title ? `<p class="media-caption">${title}</p>` : ''}
      </div>`;
    }
  );
  
  // Add a check for empty content
  if (!data || !contentHtml) {
    return (
      <div className="prose prose-lg dark:prose-invert mx-auto">
        <div className="flex items-center space-x-4 mb-10">
          <Link 
            href="/#projects"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
            All Projects
          </Link>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Project Not Found</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          The project content could not be loaded. Please check back later.
        </p>
      </div>
    );
  }
  
  return (
    <article className="prose prose-lg dark:prose-invert mx-auto">
      <div className="flex items-center space-x-4 mb-10">
        <Link 
          href="/#projects"
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
          All Projects
        </Link>
        <button 
          onClick={copyToClipboard}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <LinkIcon className="h-4 w-4 mr-1.5" />
          {copied ? 'Copied!' : 'Copy URL'}
        </button>
      </div>
      
      {data.image && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image 
            src={data.image} 
            alt={data.title}
            width={1200}
            height={630}
            className="w-full object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">{data.description}</p>
        
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          {data.date && (
            <div className="flex items-center mr-4">
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              <span>{data.date}</span>
            </div>
          )}
          
          {data.technologies && data.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4 pt-2">
          {data.github && (
            <a 
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <GithubIcon className="h-4 w-4 mr-1.5" />
              GitHub Repository
            </a>
          )}
          
          {data.website && (
            <a 
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <LinkIcon className="h-4 w-4 mr-1.5" />
              Live Website
            </a>
          )}
        </div>
      </div>
      
      <div 
        className="markdown-content pt-8"
        dangerouslySetInnerHTML={{ __html: processedHtml }} 
      />
    </article>
  );
} 