"use client";

import { useLike } from "@/features/like/useLike";
import { Heart, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/features/post/postApi";

type PostType = {
  id: number;
  likedByMe: boolean;
  likeCount: number;
};

type Props = {
  post: PostType;
  setLiked: (liked: boolean) => void;
  setLikes: (likes: number) => void;
};

export default function PostActions({ post, setLiked, setLikes }: Props) {
  const likeMutation = useLike();
  const queryClient = useQueryClient();

  // --- Like Button ---
  const handleLike = () => {
    likeMutation.mutate(
      { postId: post.id, liked: post.likedByMe },
      {
        onSuccess: () => {
          setLiked(!post.likedByMe);
          setLikes(post.likedByMe ? post.likeCount - 1 : post.likeCount + 1);
        },
      }
    );
  };

  // --- Delete Mutation ---
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      // Refresh feed setelah delete sukses
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    deleteMutation.mutate(post.id.toString());
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      {/* Like Button */}
      <button onClick={handleLike}>
        <Heart
          className={`w-6 h-6 ${
            post.likedByMe ? "text-red-500 fill-red-500" : "text-white"
          }`}
        />
      </button>
      <span className="text-sm text-gray-400">{post.likeCount} likes</span>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 text-white hover:text-red-600"
      >
        <Trash size={16} />
        Delete
      </button>
    </div>
  );
}
