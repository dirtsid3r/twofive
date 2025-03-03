type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Kollektif',
    description: 'Bespoke branding and web experience for a Copenhagen-based talent agency',
    link: '/projects/kollektif',
    video: '', // We're not using videos anymore
    id: 'kollektif', // This should match your image filename (without extension)
  },
  {
    name: 'Glass',
    description: 'AI-powered SaaS fighting counterfeit products for global brands',
    link: '/projects/glass',
    video: '',
    id: 'glass',
  },
  {
    name: 'JMT Checkouts',
    description: 'Checkout UX overhaul doubling conversion rates for group travel bookings',
    link: '/projects/jmt-checkouts',
    video: '',
    id: 'jmt-checkouts',
  },
  {
    name: 'JMT Prime',
    description: 'No-code luxury travel platform achieving 35% sold-out premium trips in 1 month',
    link: '/projects/jmt-prime',
    video: '',
    id: 'jmt-prime',
  },
  {
    name: 'Joynt',
    description: 'Chat-first micro-creator platform leading to SOSV investment',
    link: '/projects/joynt',
    video: '',
    id: 'joynt',
  },
  {
    name: 'Cambium',
    description: 'Sustainable wooden watch brand blending horology with eco-storytelling',
    link: '/projects/cambium',
    video: '',
    id: 'cambium',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Reglazed Studio',
    title: 'CEO',
    start: '2024',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work1',
  },
  {
    company: 'Freelance',
    title: 'Design Engineer',
    start: '2022',
    end: '2024',
    link: 'https://ibelick.com',
    id: 'work2',
  },
  {
    company: 'Freelance',
    title: 'Front-end Developer',
    start: '2017',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ibelick',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/ibelick',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ibelick',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/ibelick',
  },
]

export const EMAIL = 'your@email.com'

export const AUTHOR = {
  name: 'Vishnu',
  title: 'Digital Product Designer',
}
