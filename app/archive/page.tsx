'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'

// Sample archive items
const ARCHIVE_ITEMS = [
  {
    id: 1,
    image: '/images/archive/item1.jpg',
    caption: 'Early design exploration for Joynt messaging platform',
  },
  {
    id: 2,
    image: '/images/archive/item2.jpg',
    caption: 'Wireframes for checkout flow optimization',
  },
  {
    id: 3,
    image: '/images/archive/item3.jpg',
    caption: 'Color palette studies for a fintech app',
  },
  {
    id: 4,
    image: '/images/archive/item4.jpg',
    caption: 'User journey mapping session',
  },
  {
    id: 5,
    image: '/images/archive/item5.jpg',
    caption: 'Prototype testing with early users',
  },
  {
    id: 6,
    image: '/images/archive/item6.jpg',
    caption: 'Design system components for a healthcare project',
  },
  // Add more items as needed
]

export default function Archive() {
  return (
    <div className="max-w-4xl mx-auto py-16 inner-page">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Archive
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        A collection of design artifacts, explorations, and moments from my journey as a designer.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {ARCHIVE_ITEMS.map((item) => (
          <div key={item.id} className="rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image 
                src={item.image} 
                alt={item.caption}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2">
              {item.caption}
            </p>
          </div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
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