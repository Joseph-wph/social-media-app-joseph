"use client";

import { useLike } from "@/features/like/useLike";
import { Heart } from "lucide-react";

type Props = {
  post: {
    id: number;
    likedByMe: boolean;
    likeCount: number;
  };
  setLiked: (liked: boolean) => void;
  setLikes: (likes: number) => void;
};

export default function PostActions({ post, setLiked, setLikes }: Props) {
  const likeMutation = useLike();

  const handleLike = () => {
    likeMutation.mutate(
      { postId: post.id, liked: post.likedByMe },
      {
        onSuccess: () => {
          // toggle UI state PostCard
          setLiked(!post.likedByMe);
          setLikes(post.likedByMe ? post.likeCount - 1 : post.likeCount + 1);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <button onClick={handleLike}>
        <Heart
          className={`w-6 h-6 ${
            post.likedByMe ? "text-red-500 fill-red-500" : "text-white"
          }`}
        />
      </button>
      <span className="text-sm text-gray-400">{post.likeCount} likes</span>
    </div>
  );
}
