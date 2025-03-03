export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-2xl mx-auto py-16 inner-page">
      {children}
    </div>
  )
} 