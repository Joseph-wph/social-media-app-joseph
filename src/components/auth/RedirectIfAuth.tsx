"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"

export default function RedirectIfAuth({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (user) {
      router.push("/feed")
    }
  }, [user, router])

  return <>{children}</>
}