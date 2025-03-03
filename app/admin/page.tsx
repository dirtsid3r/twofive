'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  name: string
  description: string
  video: string
  link: string
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    // Fetch projects
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setIsLoading(false);
      });
  }, [router]);
  
  const handleSave = async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      },
      body: JSON.stringify(projects),
    });
    
    if (response.ok) {
      alert('Projects saved successfully!');
    } else {
      alert('Failed to save projects');
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <input
              className="w-full mb-2 p-2 border rounded"
              value={project.name}
              onChange={e => {
                const newProjects = [...projects];
                newProjects[index].name = e.target.value;
                setProjects(newProjects);
              }}
              placeholder="Project Name"
            />
            <textarea
              className="w-full mb-2 p-2 border rounded"
              value={project.description}
              onChange={e => {
                const newProjects = [...projects];
                newProjects[index].description = e.target.value;
                setProjects(newProjects);
              }}
              placeholder="Description"
              rows={3}
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={project.video}
              onChange={e => {
                const newProjects = [...projects];
                newProjects[index].video = e.target.value;
                setProjects(newProjects);
              }}
              placeholder="Video URL"
            />
            <input
              className="w-full p-2 border rounded"
              value={project.link}
              onChange={e => {
                const newProjects = [...projects];
                newProjects[index].link = e.target.value;
                setProjects(newProjects);
              }}
              placeholder="Project Link"
            />
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setProjects([...projects, { name: '', description: '', video: '', link: '' }])}
        >
          Add Project
        </button>
      </div>
      
      <button
        className="bg-green-500 text-white px-6 py-2 rounded"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
} 