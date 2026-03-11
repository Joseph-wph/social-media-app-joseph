"use client"

import { ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "@/store/store"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthLoader from "@/features/auth/authLoader"
import { AuthProvider } from "./authProviders"

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthLoader>{children}</AuthLoader>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}