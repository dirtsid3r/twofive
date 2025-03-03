import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { markdownToHtml } from '@/lib/markdown';
import ProjectContent from './project-content';
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react'

// Get all project posts for static paths
export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'app/projects/posts');
  
  try {
    const filenames = fs.readdirSync(projectsDirectory);
    
    return filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => ({
        slug: filename.replace(/\.mdx$/, ''),
      }));
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

// Get project metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app/projects/posts', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return {
      title: data.title || slug,
      description: data.description || '',
    };
  } catch (error) {
    console.error(`Error reading project metadata for ${slug}:`, error);
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
}

// Render the project page
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app/projects/posts', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Convert markdown to HTML
    const contentHtml = await markdownToHtml(content);
    
    return (
      <>
        <ProjectContent data={data} contentHtml={contentHtml} />
        <div className="flex items-center space-x-4 mt-8">
          <Button 
            href="/"
            variant="link"
            icon={<ArrowLeftIcon size={16} />}
          >
            Back to home
          </Button>
          
          <Button 
            href={data.liveUrl}
            variant="primary"
            icon={<ExternalLinkIcon size={16} />}
            iconPosition="right"
            target="_blank"
          >
            View Live
          </Button>
        </div>
      </>
    );
  } catch (error) {
    console.error(`Error rendering project for ${slug}:`, error);
    notFound();
  }
} 