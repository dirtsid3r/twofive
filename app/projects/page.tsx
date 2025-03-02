import Link from 'next/link';
import projects from '@/app/data/projects.json';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'View my portfolio of projects and case studies',
};

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link 
            key={project.name}
            href={`/projects/${project.slug}`}
            className="group block border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {project.video && (
              <div className="aspect-video relative">
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 