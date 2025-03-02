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
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState(COLOR_THEMES[0])
  const pathname = usePathname()
  
  // Check if we're on a blog post page
  const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog'

  // Set default theme to light
  useEffect(() => {
    if (!mounted) {
      setTheme('light')
    }
    setMounted(true)
  }, [setTheme, mounted])

  // Clean up creative theme when switching to light/dark
  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      // Remove creative theme class and reset variables
      document.documentElement.classList.remove('creative-theme')
      document.documentElement.style.removeProperty('--color-overlay');
      
      // Remove any overlay element
      const overlay = document.getElementById('creative-theme-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  }, [theme]);

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
    <div className="relative z-10">
      <AnimatedBackground
        className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
        defaultValue={theme}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
        enableHover={false}
        onValueChange={(id) => {
          handleThemeChange(id as string)
        }}
      >
        {THEMES_OPTIONS.map((themeOption) => {
          return (
            <button
              key={themeOption.id}
              className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
              type="button"
              aria-label={`Switch to ${themeOption.label} theme`}
              data-id={themeOption.id}
            >
              {themeOption.icon}
            </button>
          )
        })}
      </AnimatedBackground>

      {/* Color picker for Creative theme */}
      {showColorPicker && (
        <div className="absolute right-0 top-10 z-50 mt-2 w-48 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-800">
          <div className="py-1 text-sm text-zinc-700 dark:text-zinc-300">
            <p className="mb-2 px-2 font-medium">Choose a color theme:</p>
            {COLOR_THEMES.map((colorTheme) => (
              <button
                key={colorTheme.name}
                className="flex w-full items-center px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => applyCreativeTheme(colorTheme)}
              >
                <div 
                  className="mr-2 h-4 w-4 rounded-full" 
                  style={{ backgroundColor: colorTheme.primary }}
                />
                {colorTheme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  
  // Check if we're on a blog post page
  const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog'
  
  return (
    <header className="mb-8 flex items-center justify-between relative z-10">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Your Name
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Your Title/Role
        </TextEffect>
      </div>
      {/* Theme switcher */}
      <div className="text-xs text-zinc-400">
        <ThemeSwitch />
      </div>
    </header>
  )
}
