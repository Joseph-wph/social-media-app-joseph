"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { getFeed } from "./feedApi"

export const useFeed = () => {

  return useInfiniteQuery({
    queryKey: ["feed"],

    queryFn: ({ pageParam }) =>
      getFeed(pageParam as number, 20),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {

      const pagination = lastPage?.data?.pagination

      if (!pagination) return undefined

      if (pagination.page < pagination.totalPages) {
        return pagination.page + 1
      }

      return undefined
    },

  })
}