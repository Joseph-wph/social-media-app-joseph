"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isReady, setIsReady] = useState(false) // flag untuk menunggu localStorage

  // cek token di localStorage setelah mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
    setIsReady(true) // siap render anak-anak
  }, [])

  const login = (token: string) => {
    localStorage.setItem("token", token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  // jangan render children sebelum siap
  if (!isReady) return null

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)