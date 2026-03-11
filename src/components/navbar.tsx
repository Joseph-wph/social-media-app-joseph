"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout as logoutAction } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Hapus user dari Redux
    dispatch(logoutAction());
    // Redirect ke login atau feed
    router.push("/login");
  };

  return (
    <nav className="w-full mx-auto border-b border-neutral-700 bg-neutral-950">
      <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
        {/* LOGO */}
        <div className="flex gap-3">
          <img src="/assets/logo/logo.svg" alt="logo" />
          <Link href="/feed" className="font-bold text-lg">
            Sociality
          </Link>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search..."
          className="hidden md:block border border-neutral-800 bg-neutral-900 rounded-full px-3 py-1 w-64"
        />

        {/* USER NAVBAR */}
        {user ? (
          <div className="flex items-center gap-3">
            <Image
              src={
                user?.avatarUrl && user.avatarUrl.startsWith("http")
                  ? user.avatarUrl
                  : "/assets/avatar/avatar.svg"
              }
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />

            <span className="hidden md:block font-medium">{user.username}</span>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-red-600 hover:text-white transition"
            >
              <LogOut size={16} />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        ) : (
          <>
            {/* DESKTOP GUEST */}
            <div className="hidden md:flex gap-3">
              <Link
                href="/login"
                className="w-32 h-11 px-3 py-1 hover:bg-(--color-primary-300) border border-neutral-700 rounded-full flex justify-center items-center"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="w-32 h-11 px-3 py-1 hover:bg-(--color-primary-300) border border-neutral-700 rounded-full flex justify-center items-center"
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
        <div className="w-full mx-auto md:hidden mb-5 flex justify-center items-center gap-5 px-5">
          <Link
            href="/login"
            className="w-43 h-10 px-3 py-1 hover:bg-(--color-primary-300) border border-neutral-700 rounded-full flex justify-center items-center"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="w-43 h-10 px-3 py-1 hover:bg-(--color-primary-300) border border-neutral-700 rounded-full flex justify-center items-center"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
