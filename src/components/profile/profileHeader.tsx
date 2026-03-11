"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Link from "next/link";

type Props = {
  profile: {
    name: string;
    username: string;
    bio: string | null;
    avatarUrl: string | null;
  };
};

export default function ProfileHeader({ profile }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* TOP ROW */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profile.avatarUrl ?? ""} />
            <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-neutral-400">@{profile.username}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <Link href="/profile/edit">
            <Button className="rounded-full border border-neutral-700 px-5  w-32 h-12 hover:bg-neutral-900 transition">
              Edit Profile
            </Button>
          </Link>

          <button className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-900 transition">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* BIO */}
      {profile.bio && (
        <p className="text-sm text-neutral-300 max-w-xl">{profile.bio}</p>
      )}
    </div>
  );
}
