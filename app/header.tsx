'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { MoonIcon, SunIcon, PaletteIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Updated theme options with Creative instead of System
const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'Creative',
    id: 'creative',
    icon: <PaletteIcon className="h-4 w-4" />,
  },
]

// Color options for Creative theme
const COLOR_THEMES = [
  { name: 'Blue', primary: '#0ea5e9', blend: 'rgba(14, 165, 233, 0.15)' },
  { name: 'Purple', primary: '#8b5cf6', blend: 'rgba(139, 92, 246, 0.15)' },
  { name: 'Green', primary: '#10b981', blend: 'rgba(16, 185, 129, 0.15)' },
  { name: 'Pink', primary: '#ec4899', blend: 'rgba(236, 72, 153, 0.15)' },
  { name: 'Orange', primary: '#f97316', blend: 'rgba(249, 115, 22, 0.15)' },
]

function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState(COLOR_THEMES[0])
  const pathname = usePathname()
  
  // Check if we're on a blog post page
  const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog'

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleThemeChange = (id: string) => {
    if (id === 'creative') {
      setShowColorPicker(true)
    } else {
      // Explicitly handle dark mode
      if (id === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('creative-theme')
        
        // Remove any overlay element
        const overlay = document.getElementById('creative-theme-overlay');
        if (overlay) {
          overlay.remove();
        }
      } else if (id === 'light') {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.remove('creative-theme')
        
        // Remove any overlay element
        const overlay = document.getElementById('creative-theme-overlay');
        if (overlay) {
          overlay.remove();
        }
      }
      
      setTheme(id)
      setShowColorPicker(false)
    }
  }

  const applyCreativeTheme = (colorTheme: typeof COLOR_THEMES[0]) => {
    setSelectedColor(colorTheme)
    
    // Apply the selected colors to CSS variables
    document.documentElement.style.setProperty('--color-overlay', colorTheme.blend)
    
    // Set a custom class for the creative theme
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('creative-theme')
    
    // Create or update the overlay element
    let overlay = document.getElementById('creative-theme-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'creative-theme-overlay';
      document.body.appendChild(overlay);
    }
    
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = colorTheme.blend;
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1';
    overlay.style.mixBlendMode = 'multiply';
    
    setShowColorPicker(false)
    setTheme('creative')
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-1 dark:border-zinc-800">
      {THEMES_OPTIONS.map((option) => (
        <button
          key={option.id}
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            theme === option.id
              ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
          }`}
          onClick={() => handleThemeChange(option.id)}
        >
          {option.icon}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col">
        <TextEffect
          as="h1"
          className="text-xl font-bold tracking-tight"
          per="char"
          delay={0.3}
        >
          Vishnu
        </TextEffect>
        <TextEffect
          as="p"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Digital Product Designer
        </TextEffect>
      </div>
      {/* Theme switcher */}
      <div className="text-xs text-zinc-400">
        <ThemeSwitch />
      </div>
    </header>
  )
}
