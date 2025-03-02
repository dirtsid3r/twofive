import Link from 'next/link';
import projects from '@/app/data/projects.json';

export function Projects() {
  return (
    <section id="projects" className="py-12">
      <h2 className="text-2xl font-bold mb-6">Selected Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.name} className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
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
              <Link href={`/projects/${project.slug}`} className="block">
                <h3 className="text-xl font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {project.name}
                </h3>
              </Link>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1 mb-4">{project.description}</p>
              <div className="flex space-x-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 