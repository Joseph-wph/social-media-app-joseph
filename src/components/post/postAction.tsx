"use client";

import { useLike } from "@/features/like/useLike";
import { Heart } from "lucide-react";

type Props = {
  post: any;
};

export default function PostActions({ post }: Props) {
  const likeMutation = useLike();

  const handleLike = () => {
    likeMutation.mutate({
      postId: post.id,
      liked: post.liked,
    });
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <button onClick={handleLike}>
        <Heart
          className={`w-6 h-6 ${
            post.liked ? "text-red-500 fill-red-500" : "text-white"
          }`}
        />
      </button>

      <span className="text-sm text-gray-400">{post.likesCount || 0} likes</span>
    </div>
  );
}