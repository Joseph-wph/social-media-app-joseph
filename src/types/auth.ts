import { User } from "./user"

export type RegisterInput = {
  name: string
  username: string
  email: string
  phone: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

export type AuthData = {
  token: string
  user: User
}