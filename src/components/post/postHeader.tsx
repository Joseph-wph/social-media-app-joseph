"use client";

import Image from "next/image";
import { PostUser } from "@/types/post";

type Props = {
  user?: PostUser; // user optional
  createdAt: string;
};

export default function PostHeader({ user, createdAt }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={user?.avatar || "/assets/avatar/avatar.svg"}
        alt={user?.username || "Unknown"}
        width={36}
        height={36}
        className="rounded-full"
      />

      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {user?.username || "Unknown"}
        </span>
        <span className="text-xs text-gray-400">{createdAt}</span>
      </div>
    </div>
  );
}
