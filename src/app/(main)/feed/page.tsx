"use client"

import { useFeed } from "@/features/feed/useFeed"
import PostCard from "@/components/post/postCard"

export default function FeedPage() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed()

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6">

      {data?.pages.map((page) =>
        page.data.items.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))
      )}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="w-full py-3 bg-gray-900 rounded-lg"
        >
          {isFetchingNextPage
            ? "Loading..."
            : "Load More"}
        </button>
      )}

    </main>
  )
}