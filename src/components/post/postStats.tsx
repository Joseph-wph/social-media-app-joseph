"use client";

type Props = {
  likes?: number;
  comments?: number;
  shares?: number;
};

export default function PostStats({
  likes = 0,
  comments = 0,
  shares = 0,
}: Props) {
  return (
    <div className="flex gap-6 text-sm text-gray-400">
      <div className="flex items-center gap-1">❤️ {likes}</div>
      <div className="flex items-center gap-1">💬 {comments}</div>
      <div className="flex items-center gap-1">🔁 {shares}</div>
    </div>
  );
}