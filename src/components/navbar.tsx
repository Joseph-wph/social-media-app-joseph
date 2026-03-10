"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-neutral-700 bg-neutral-950">
      <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
        {/* LOGO */}

        <Link href="/feed" className="font-bold text-lg">
          SocialApp
        </Link>

        {/* SEARCH */}

        <input
          placeholder="Search..."
          className="hidden md:block border-neutral-700 bg-neutral-800 rounded-full px-3 py-1 w-64"
        />

        {/* USER NAVBAR */}

        {user ? (
          <div className="flex items-center gap-3">
            <Image
              src="/assets/avatar/avatar.svg"
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />

            <span className="hidden md:block font-medium">{user.username}</span>
          </div>
        ) : (
          <>
            {/* DESKTOP GUEST */}

            <div className="hidden md:flex gap-3">
              <Link href="/login" className="px-3 py-1 border rounded">
                Login
              </Link>

              <Link
                href="/register"
                className="px-3 py-1 bg-black text-white rounded"
              >
                Register
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        )}
      </div>

      {/* MOBILE MENU */}

      {!user && menuOpen && (
        <div className="flex md:hidden border-t">
          <Link href="/login" className="flex-1 text-center p-3 border-r">
            Login
          </Link>

          <Link href="/register" className="flex-1 text-center p-3">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
