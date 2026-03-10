"use client";

import { useState } from "react";
import { useLike } from "@/features/like/useLike";
import { Heart } from "lucide-react";

type Props = {
  post: {
    id: number;
    likedByMe: boolean;
    likeCount: number;
  };
};

export default function PostActions({ post }: Props) {
  const likeMutation = useLike();

  const [liked, setLiked] = useState(post.likedByMe);
  const [likes, setLikes] = useState(post.likeCount);

  const handleLike = () => {
    likeMutation.mutate(
      { postId: post.id, liked: !liked },
      {
        onSuccess: () => {
          // optimistically update UI
          setLiked((prev) => !prev);
          setLikes((prev) => (liked ? prev - 1 : prev + 1));
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <button onClick={handleLike}>
        <Heart
          className={`w-6 h-6 ${
            liked ? "text-red-500 fill-red-500" : "text-white"
          }`}
        />
      </button>
      <span className="text-sm text-gray-400">{likes} likes</span>
    </div>
  );
}
