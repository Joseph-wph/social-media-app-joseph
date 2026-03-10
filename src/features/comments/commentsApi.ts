import { api } from "@/lib/api"

export const createComment = async (postId: string, content: string) => {
  const res = await api.post(`/api/comments/${postId}`, { content })
  return res.data
}

export const getComments = async (postId: string) => {
  const res = await api.get(`/api/comments/${postId}`)
  return res.data
}

export const deleteComment = async (id: string) => {
  const res = await api.delete(`/api/comments/${id}`)
  return res.data
}