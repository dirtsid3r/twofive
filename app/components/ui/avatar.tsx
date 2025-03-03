import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export function Avatar({ src, alt, size = 64, className = '' }: AvatarProps) {
  return (
    <div 
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </div>
  )
} 