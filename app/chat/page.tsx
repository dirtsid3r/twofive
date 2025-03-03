'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { SendIcon } from 'lucide-react'

export default function Chat() {
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the message to a backend
    console.log('Message sent:', message)
    setMessage('')
  }
  
  return (
    <div className="max-w-2xl mx-auto py-16 inner-page">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Let's Chat
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            <SendIcon size={16} />
            Send Message
          </button>
        </form>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p>
          You can also reach me at <a href="mailto:hello@vishnuv.design">hello@vishnuv.design</a>
        </p>
        
        <Link 
          href="/"
          className="underline"
        >
          ← Back to home
        </Link>
      </motion.div>
    </div>
  )
} 