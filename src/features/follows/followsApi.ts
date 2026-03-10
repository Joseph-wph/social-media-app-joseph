import { api } from "@/lib/api"

export const followUser = async (username: string) => {
  const res = await api.post(`/api/follows/${username}`)
  return res.data
}

export const unfollowUser = async (username: string) => {
  const res = await api.delete(`/api/follows/${username}`)
  return res.data
}

export const getFollowers = async (username: string) => {
  const res = await api.get(`/api/users/${username}/followers`)
  return res.data
}

export const getFollowing = async (username: string) => {
  const res = await api.get(`/api/users/${username}/following`)
  return res.data
}