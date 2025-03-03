'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { BLOG_POSTS } from '../data'

export default function Blog() {
  return (
    <div className="max-w-2xl mx-auto py-16 inner-page">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Blog
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Thoughts on design, technology, and the creative process.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 space-y-8"
      >
        {BLOG_POSTS.map((post) => (
          <div key={post.uid} className="group">
            <Link href={post.link}>
              <h2 className="group-hover:underline">{post.title}</h2>
            </Link>
            <p>{post.description}</p>
          </div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
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