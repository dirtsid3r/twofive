import Image from 'next/image'

interface ProfileAvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export function ProfileAvatar({ src, alt, size = 64, className = '' }: ProfileAvatarProps) {
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