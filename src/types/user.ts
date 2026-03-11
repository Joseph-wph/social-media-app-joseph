export type User = {
  id: number
  name: string
  username: string
  email: string
  avatarUrl?: string
  phone?: string
  bio?: string
}

export type MyProfile = {
  profile: {
    id: number
    name: string
    username: string
    email: string
    phone: string
    bio: string | null
    avatarUrl: string | null
    createdAt: string
  }

  stats: {
    posts: number
    followers: number
    following: number
    likes: number
  }
}

export type PublicProfile = {
  id: number
  name: string
  username: string
  bio: string | null
  avatarUrl: string | null
}