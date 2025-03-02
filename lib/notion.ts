import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getProjects() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DB_ID!,
    sorts: [{ property: 'Order', direction: 'ascending' }],
  });
  
  return response.results.map((page: any) => ({
    id: page.id,
    name: page.properties.Name.title[0]?.plain_text || '',
    description: page.properties.Description.rich_text[0]?.plain_text || '',
    video: page.properties.Video.url || '',
    link: page.properties.Link.url || '',
  }));
}

export async function getWorkExperience() {
  // Similar implementation for work experience
} 