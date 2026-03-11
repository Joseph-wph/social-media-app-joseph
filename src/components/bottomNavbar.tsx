"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Plus, User } from "lucide-react"
import { useAuth } from "@/providers/authProviders"

export default function BottomNavbar() {
  const { isLoggedIn } = useAuth()
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-between w-85 px-8 py-4 rounded-full bg-neutral-950 border border-neutral-800 shadow-lg">
        {/* HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center text-sm ${
            pathname === "/" ? "text-purple-500" : "text-neutral-400"
          }`}
        >
          <Home size={22} />
          Home
        </Link>

        {/* CREATE POST */}
        {isLoggedIn ? (
          <Link
            href="/create-post"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r from-purple-600 to-indigo-500 shadow-lg"
          >
            <Plus size={26} className="text-white" />
          </Link>
        ) : (
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-800/50 cursor-not-allowed opacity-50">
            <Plus size={26} className="text-gray-400" />
          </div>
        )}

        {/* PROFILE */}
        {isLoggedIn ? (
          <Link
            href="/profile"
            className={`flex flex-col items-center text-sm ${
              pathname === "/profile" ? "text-purple-500" : "text-neutral-400"
            }`}
          >
            <User size={22} />
            Profile
          </Link>
        ) : (
          <div className="flex flex-col items-center text-sm cursor-not-allowed opacity-50">
            <User size={22} />
            Profile
          </div>
        )}
      </div>
    </div>
  )
}
