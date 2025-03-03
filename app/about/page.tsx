'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-16 inner-page">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        About Me
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Image 
          src="/images/profile.jpg" 
          alt="Vishnu" 
          width={200} 
          height={200} 
          className="rounded-lg mb-6"
        />
        
        <h2>Vishnu</h2>
        <p>
          I'm a Digital Product Designer with over a decade of experience shipping products for 10M+ users. 
          My journey began when I dropped out of my Bachelor's to join Lookup as an early team member, 
          where we outpaced Facebook to reach 10M+ users.
        </p>
        
        <p>
          I designed Joynt's 100M-message platform and co-led checkout flows that doubled conversions. 
          Currently, I'm pursuing a UX Design Master's at the University of Brighton while continuing 
          to craft ethical, user-first products for Earth's innovators.
        </p>
        
        <p>
          My design philosophy centers around creating intuitive, accessible, and delightful experiences 
          that solve real problems for users while driving business goals.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button 
          href="/"
          variant="link"
          iconPosition="left"
          icon={<ArrowLeftIcon size={16} />}
        >
          Back to home
        </Button>
      </motion.div>
    </div>
  )
} 