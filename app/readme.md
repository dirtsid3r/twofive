# Personal Portfolio & Blog

A modern, responsive portfolio website with blog functionality built with Next.js, Tailwind CSS, and Markdown.

## Features

- Responsive design with mobile-first approach
- Multiple theme options (Light, Dark, and Creative color themes)
- Blog with Markdown/MDX support
- Project showcase with video support
- Work experience timeline
- Contact information and social links
- SEO optimized

## Tech Stack

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Markdown/MDX for blog content
- Lucide React for icons
- Motion for animations

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-blog.git
   cd portfolio-blog
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and helpers
- `public/` - Static assets
- `app/blog/posts/` - MDX blog posts
- `app/data/` - JSON data files for projects and work experience

## Adding Content

### Blog Posts

Add new blog posts in the `app/blog/posts` directory as MDX files with frontmatter:

### Projects

Update projects in `app/data/projects.json`.

### Work Experience

Update work experience in `app/data/work-experience.json`.

## Customization

- Edit `app/data.tsx` to update your personal information and social links
- Modify theme colors in `tailwind.config.js` and `app/globals.css`
- Customize components in the `components/ui/` directory

## Deployment

This project can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio-blog)

## License

MIT
