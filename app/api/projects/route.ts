import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  return NextResponse.json(data);
}

// If you want to update content via API (requires authentication)
export async function POST(request: Request) {
  // Add authentication check here
  const data = await request.json();
  
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  
  return NextResponse.json({ success: true });
} 