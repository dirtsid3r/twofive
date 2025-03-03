'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClockIcon, ArrowLeftIcon, LinkIcon } from 'lucide-react';

export interface BlogPostContentProps {
  data: {
    title: string;
    description: string;
    date: string;
    // Add any other required fields
  };
  contentHtml: string;
}

export default function BlogPostContent({ data, contentHtml }: BlogPostContentProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <article className="prose prose-lg dark:prose-invert mx-auto">
      <div className="flex items-center space-x-4 mb-10">
        <Link 
          href="/"
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
          Go Back
        </Link>
        <button 
          onClick={copyToClipboard}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <LinkIcon className="h-4 w-4 mr-1.5" />
          {copied ? 'Copied!' : 'Copy URL'}
        </button>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">{data.description}</p>
        {data.date && (
          <div className="flex items-center text-zinc-500 dark:text-zinc-500 pb-8">
            <ClockIcon className="h-4 w-4 mr-1.5" />
            <span>
              {new Date(data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>
      
      <div 
        className="markdown-content pt-4"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
    </article>
  );
} 