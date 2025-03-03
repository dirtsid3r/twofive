'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SendIcon, ArrowLeftIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function Contact() {
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Message sent:', message)
    setMessage('')
    // Add your form submission logic here
  }

  return (
    <div className="max-w-2xl mx-auto py-16 inner-page">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <p>
          Have a project in mind or just want to connect? Drop me a message here and I'll get back to you as soon as possible.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-800 focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-white"
              placeholder="Tell me about your project, ask a question, or just say hi!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit"
            variant="primary"
            icon={<SendIcon size={16} />}
          >
            Send Message
          </Button>
        </form>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button 
          href="/"
          variant="link"
          icon={<ArrowLeftIcon size={16} />}
        >
          Back to home
        </Button>
      </motion.div>
    </div>
  )
} 