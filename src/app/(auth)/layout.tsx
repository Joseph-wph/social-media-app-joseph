export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-black via-purple-950 to-purple-700">
      {children}
    </div>
  )
}