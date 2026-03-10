"use client"

import { useMutation } from "@tanstack/react-query"
import { login } from "./authApi"
import { useAppDispatch } from "@/store/hooks"
import { setCredentials } from "./authSlice"

export const useLogin = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: login,

    onSuccess: (res) => {
      const { token, user } = res.data

      localStorage.setItem("token", token)

      dispatch(
        setCredentials({
          user,
          token,
        })
      )
    },
  })
}