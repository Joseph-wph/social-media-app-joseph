"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "./likeApi";

export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      liked,
    }: {
      postId: number;
      liked: boolean;
    }) => {
      if (liked) {
        return unlikePost(postId);
      }

      return likePost(postId);
    },

    onMutate: async ({ postId, liked }) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });

      const previousFeed = queryClient.getQueryData(["feed"]);

      queryClient.setQueryData(["feed"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.items.map((post: any) => {
              if (post.id !== postId) return post;

              return {
                ...post,
                likedByMe: !liked,
                likeCount: liked ? post.likeCount - 1 : post.likeCount + 1,
              };
            }),
          },
        };
      });

      return { previousFeed };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["feed"], context?.previousFeed);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
    },
  });
};
