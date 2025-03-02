import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(order asc) {
    _id,
    name,
    description,
    "video": video.asset->url,
    link
  }`);
}

export async function getWorkExperience() {
  // Similar implementation for work experience
} 