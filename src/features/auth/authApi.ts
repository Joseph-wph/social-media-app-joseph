import { api } from "@/lib/api"
import { RegisterInput, LoginInput, AuthData } from "@/types/auth"
import { ApiResponse } from "@/types/api"
import { User } from "@/types/user"

export const register = async (
  data: RegisterInput
): Promise<ApiResponse<AuthData>> => {
  const res = await api.post("/api/auth/register", data)
  return res.data
}

export const login = async (
  data: LoginInput
): Promise<ApiResponse<AuthData>> => {
  const res = await api.post("/api/auth/login", data)
  return res.data
}

export const getMe = async (): Promise<ApiResponse<User>> => {
  const res = await api.get("/api/me")
  return res.data
}