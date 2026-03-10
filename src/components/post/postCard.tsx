"use client";

import { useState } from "react";
import PostHeader from "./postHeader";
import PostImage from "./postImage";
import PostStats from "./postStats";
import PostCaption from "./postCaption";
import PostSave from "./postSave";
import PostActions from "./postAction";

type PostFromAPI = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author?: {
    id: number;
    username: string;
    name: string;
    avatarUrl?: string | null;
  };
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};

type Props = {
  post: PostFromAPI;
};

export default function PostCard({ post }: Props) {
  const user = post.author;

  const [liked, setLiked] = useState(post.likedByMe);
  const [likes, setLikes] = useState(post.likeCount);

  return (
    <div className="space-y-3 border-b border-neutral-950 pb-6">
      <PostHeader user={user} createdAt={post.createdAt || ""} />

      <PostImage image={post.imageUrl || ""} />

      <div className="flex justify-between items-center">
        <PostActions
          post={{ id: post.id, likedByMe: liked, likeCount: likes }}
          setLiked={setLiked}
          setLikes={setLikes}
        />
        <PostSave />
      </div>

      <PostStats likes={likes} comments={post.commentCount} />

      <PostCaption
        username={user?.username || "Unknown"}
        caption={post.caption || ""}
      />
    </div>
  );
}
