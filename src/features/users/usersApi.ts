import { api } from "@/lib/api"

export const searchUsers = async (query: string) => {
  const res = await api.get(`/api/users/search?q=${query}`)
  return res.data
}