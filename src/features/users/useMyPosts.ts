"use client"

import { useQuery } from "@tanstack/react-query"
import { getMyPosts } from "./usersApi"

export const useMyPosts = () => {
  return useQuery({
    queryKey: ["my-posts"],
    queryFn: () => getMyPosts(),
  })
}