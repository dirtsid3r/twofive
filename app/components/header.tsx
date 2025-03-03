'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { ThemeSelector } from '@/components/theme-selector'
import Image from 'next/image'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2"
        >
          <span className="font-bold text-lg">Vishnu</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`transition-colors ${
              pathname === '/' 
                ? 'text-black dark:text-white' 
                : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className={`transition-colors ${
              pathname === '/projects' || pathname.startsWith('/projects/') 
                ? 'text-black dark:text-white' 
                : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            Projects
          </Link>
          <Link 
            href="/blog" 
            className={`transition-colors ${
              pathname === '/blog' || pathname.startsWith('/blog/') 
                ? 'text-black dark:text-white' 
                : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center">
          <ThemeSelector />
        </div>
      </div>
    </header>
  )
} 