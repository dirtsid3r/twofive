'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { ThemeSelector } from '@/components/theme-selector'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/80 backdrop-blur-md dark:bg-zinc-900/80' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-4">
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === '/' ? 'text-black dark:text-white' : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium ${
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