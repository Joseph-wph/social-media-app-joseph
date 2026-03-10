"use client";

import { useState } from "react";

type Props = {
  username: string;
  caption: string;
};

export default function PostCaption({ username, caption }: Props) {
  const [expanded, setExpanded] = useState(false);

  const text = caption || "";
  const shortText = text.slice(0, 80);

  return (
    <div className="text-sm">
      <span className="font-semibold mr-2">{username || "Unknown"}</span>
      {expanded ? text : shortText}
      {text.length > 80 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 ml-2"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}