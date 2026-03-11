"use client"

import Link from "next/link"
import { Home, Plus, User } from "lucide-react"
import { usePathname } from "next/navigation"

export default function BottomNavbar() {

  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

      <div className="flex items-center justify-between w-85 px-8 py-4 rounded-full bg-neutral-950 border border-neutral-800 shadow-lg">

        {/* HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center text-sm ${
            pathname.startsWith("/feed") ? "text-purple-500" : "text-neutral-400"
          }`}
        >
          <Home size={22} />
          Home
        </Link>

        {/* CREATE POST */}
        <Link
          href="/create-post"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r from-purple-600 to-indigo-500  shadow-lg"
        >
          <Plus size={26} className="text-white"/>
        </Link>

        {/* PROFILE */}
        <Link
          href="/profile"
          className={`flex flex-col items-center text-sm ${
            pathname === "/profile" ? "text-purple-500" : "text-neutral-400"
          }`}
        >
          <User size={22} />
          Profile
        </Link>

      </div>

    </div>
  )
}