import { api } from "@/lib/api"

export const savePost = async (postId: string) => {
  const res = await api.post(`/api/saves/${postId}`)
  return res.data
}

export const unsavePost = async (postId: string) => {
  const res = await api.delete(`/api/saves/${postId}`)
  return res.data
}

export const getSavedPosts = async (username: string) => {
  const res = await api.get(`/api/users/${username}/saves`)
  return res.data
}