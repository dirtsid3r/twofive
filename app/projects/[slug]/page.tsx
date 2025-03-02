import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { markdownToHtml } from '@/lib/markdown';
import ProjectContent from './project-content';

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
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app/projects/posts', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Convert markdown to HTML
    const contentHtml = await markdownToHtml(content);
    
    return <ProjectContent data={data} contentHtml={contentHtml} />;
  } catch (error) {
    console.error(`Error rendering project for ${slug}:`, error);
    notFound();
  }
} 