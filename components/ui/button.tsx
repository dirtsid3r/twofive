'use client'
import React from 'react'
import { Magnetic } from '@/components/ui/magnetic'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "flex h-10 items-center justify-center rounded-full px-4 text-sm gap-2 transition-colors", 
  {
    variants: {
      variant: {
        default: "border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900",
        primary: "bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200",
        subtle: "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
        link: "underline underline-offset-2 hover:text-zinc-800 dark:hover:text-zinc-200 p-0 h-auto",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  magnetic?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    href, 
    magnetic = true, 
    icon,
    iconPosition = 'left',
    children, 
    ...props 
  }, ref) => {
    // Determine content with icon positioning
    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
      </>
    )
    
    // If href is provided, render as an anchor tag
    if (href) {
      return magnetic ? (
        <Magnetic>
          <a
            href={href}
            className={cn(buttonVariants({ variant, size }), className)}
          >
            {content}
          </a>
        </Magnetic>
      ) : (
        <a
          href={href}
          className={cn(buttonVariants({ variant, size }), className)}
        >
          {content}
        </a>
      )
    }
    
    // Otherwise render as a button
    return magnetic ? (
      <Magnetic>
        <button
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref}
          {...props}
        >
          {content}
        </button>
      </Magnetic>
    ) : (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants } 