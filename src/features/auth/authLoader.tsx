"use client"

import { useEffect } from "react"
import { getMe } from "./authApi"
import { useAppDispatch } from "@/store/hooks"
import { setUser, logout } from "./authSlice"

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) return

    const fetchUser = async () => {
      try {
        const res = await getMe()

        dispatch(setUser(res.data))
      } catch {
        dispatch(logout())
      }
    }

    fetchUser()
  }, [dispatch])

  return <>{children}</>
}