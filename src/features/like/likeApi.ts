import { api } from "@/lib/api"

export const likePost = async (postId: number) => {
  const res = await api.post(`/api/likes/${postId}`)
  return res.data
}

export const unlikePost = async (postId: number) => {
  const res = await api.delete(`/api/likes/${postId}`)
  return res.data
}