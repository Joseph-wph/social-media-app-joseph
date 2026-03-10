"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "./postApi"

export const useCreatePost = () => {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: createPost,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["feed"],
      })
    },
  })
}