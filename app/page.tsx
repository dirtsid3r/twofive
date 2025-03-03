'use client'
import { motion } from 'motion/react'
import { XIcon, MessageCircleIcon, BookOpenIcon, ArchiveIcon, UserIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'
import CustomVideo from '@/components/ui/custom-video'
import dynamic from 'next/dynamic'
import ClientOnlyVideo from '@/components/ui/client-only-video'
import Image from 'next/image'
import { VideoCard } from '@/components/ui/video-card'
import { ArrowRightIcon } from 'lucide-react'
import { projectImages } from './project-images'
import { Button } from '@/components/ui/button'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectVideoProps = {
  src: string
}

const VideoCardNoSSR = dynamic(() => import('@/components/ui/video-card'), {
  ssr: false,
})

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <div className="aspect-video w-full rounded-xl">
      <ClientOnlyVideo src={src} />
    </div>
  )
}

function MagneticSocialLink({
  children,
  link,
  icon,
  primary = false,
}: {
  children: React.ReactNode
  link: string
  icon?: React.ReactNode
  primary?: boolean
}) {
  return (
    <Magnetic>
      <a
        href={link}
        className={`flex h-10 items-center justify-center rounded-full px-4 text-sm gap-2 ${
          primary 
            ? 'bg-black text-white dark:bg-white dark:text-black' 
            : 'border border-zinc-200 dark:border-zinc-800'
        }`}
      >
        {icon}
        {children}
      </a>
    </Magnetic>
  )
}

function ProjectCard({ name, description, link, index }: { 
  name: string;
  description: string;
  link: string;
  index: number;
}) {
  // Hardcoded image paths
  const imagePaths = [
    '/images/kollektif.jpg',
    '/images/glass.jpg',
    '/images/jmt-checkouts.jpg',
    '/images/jmt-prime.jpg',
    '/images/joynt.jpg',
    '/images/cambium.jpg',
  ];
  
  const imagePath = imagePaths[index] || '/images/placeholder.jpg';
  
  return (
    <div className="space-y-2">
      {/* Restore the original styling for the image container */}
      <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
        <div className="aspect-video w-full rounded-xl overflow-hidden">
          <img 
            src={imagePath} 
            alt={name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Restore the original styling for the text with hover animation */}
      <div className="px-1">
        <a
          className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
          href={link}
          target="_blank"
        >
          {name}
          <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-100"></span>
        </a>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Personal() {
  console.log('Projects:', PROJECTS);
  console.log('Work Experience:', WORK_EXPERIENCE);

  return (
    <motion.main
      className="space-y-0"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
      suppressHydrationWarning
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="py-16"
      >
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6"
          >
            A decade of shipping products for 10M+ users. Dropped out of my Bachelor's to be an early team member at Lookup (outpaced Facebook to 10M+ users), designed Joynt's 100M-message platform, and co-led checkout flows that doubled conversions. Now blending my hustle with a University of Brighton UX Design Master's (yes, they let me in for my work) to craft ethical, user-first products for Earth's innovators.
          </motion.p>
          
          {/* Navigation links with icons - Chat as primary CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex items-center space-x-3 mt-4"
          >
            <Button 
              href="/chat"
              variant="primary"
              icon={<MessageCircleIcon size={16} />}
            >
              Chat
            </Button>
            
            <Button 
              href="/about"
              icon={<UserIcon size={16} />}
            >
              About
            </Button>
            
            <Button 
              href="#blog-section"
              icon={<BookOpenIcon size={16} />}
            >
              Notes
            </Button>
            
            <Button 
              href="/archive"
              icon={<ArchiveIcon size={16} />}
            >
              Archive
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="pt-8 pb-16"
      >
        <h3 className="mb-5 text-lg font-medium">Selected Projects</h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={index}
              name={project.name}
              description={project.description}
              link={project.link}
              index={index}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="pt-8 pb-16"
      >
        <h3 className="mb-5 text-lg font-medium">Work Experience</h3>
        <div className="space-y-4">
          {WORK_EXPERIENCE.map((work) => (
            <div
              key={work.id}
              className="rounded-2xl border border-zinc-100 p-4 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-50">
                    {work.title}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {work.company}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  {work.start} - {work.end}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="blog-section"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="pt-8 pb-16"
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="pt-8 pb-16"
      >
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{' '}
          <a className="underline dark:text-zinc-300" href="mailto:hello@vishnuv.design">
            hello@vishnuv.design
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          <MagneticSocialLink link="https://dribbble.com/vishnuv">
            Dribbble
          </MagneticSocialLink>
          
          <MagneticSocialLink link="https://linkedin.com/in/vishnuv">
            LinkedIn
          </MagneticSocialLink>
          
          <MagneticSocialLink link="https://twitter.com/vishnuv_">
            Twitter
          </MagneticSocialLink>
          
          <MagneticSocialLink link="https://github.com/vishnuv">
            GitHub
          </MagneticSocialLink>
        </div>
      </motion.section>
    </motion.main>
  )
}
