"use client"

export default function AuthCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-105 rounded-xl border border-white/10 bg-black/60 backdrop-blur p-8 shadow-xl">

      <div className="flex flex-col items-center mb-6">

        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          ✺ Sociality
        </div>

        <h2 className="text-xl text-white mt-3">
          {title}
        </h2>

      </div>

      {children}

    </div>
  )
}