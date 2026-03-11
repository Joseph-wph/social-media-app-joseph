"use client"

import { useQuery } from "@tanstack/react-query"
import { getMyProfile } from "./usersApi"

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  })
}