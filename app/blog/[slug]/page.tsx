import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { markdownToHtml } from '@/lib/markdown';
import BlogPostContent from './blog-post-content';

// Get all blog posts for static paths
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  
  try {
    const filenames = fs.readdirSync(postsDirectory);
    
    return filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => ({
        slug: filename.replace(/\.mdx$/, ''),
      }));
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return [];
  }
}

// Get blog post metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return {
      title: data.title || slug,
      description: data.description || '',
    };
  } catch (error) {
    console.error(`Error reading blog post metadata for ${slug}:`, error);
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

// Render the blog post
export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Convert markdown to HTML
    const contentHtml = await markdownToHtml(content);
    
    return <BlogPostContent data={data} contentHtml={contentHtml} />;
  } catch (error) {
    console.error(`Error rendering blog post for ${slug}:`, error);
    notFound();
  }
} 