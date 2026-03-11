import { api } from "@/lib/api"

/* =========================
   SEARCH USERS
========================= */

export const searchUsers = async (query: string) => {
  const res = await api.get(`/api/users/search?q=${query}`)
  return res.data
}

/* =========================
   MY PROFILE
========================= */

export const getMyProfile = async () => {
  const res = await api.get("/api/me")
  return res.data.data
}

/* =========================
   UPDATE MY PROFILE
========================= */

export const updateMyProfile = async (formData: FormData) => {
  const res = await api.patch("/api/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return res.data
}

/* =========================
   MY POSTS
========================= */

export const getMyPosts = async (page = 1, limit = 20) => {
  const res = await api.get(`/api/me/posts?page=${page}&limit=${limit}`)
  return res.data.data
}

/* =========================
   PUBLIC PROFILE
========================= */

export const getUserProfile = async (username: string) => {
  const res = await api.get(`/api/users/${username}`)
  return res.data.data
}

/* =========================
   USER POSTS
========================= */

export const getUserPosts = async (username: string, page = 1, limit = 20) => {
  const res = await api.get(
    `/api/users/${username}/posts?page=${page}&limit=${limit}`
  )

  return res.data.data
}

/* =========================
   USER LIKES
========================= */

export const getUserLikes = async (username: string, page = 1, limit = 20) => {
  const res = await api.get(
    `/api/users/${username}/likes?page=${page}&limit=${limit}`
  )

  return res.data.data
}

export const updateProfile = async (data: any) => {
  const res = await api.patch("/api/me", data)
  return res.data
}