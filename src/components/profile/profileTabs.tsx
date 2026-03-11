"use client";

import { useState } from "react";
import { Grid, Bookmark } from "lucide-react";

export default function ProfileTabs() {
  const [tab, setTab] = useState<"gallery" | "saved">("gallery");

  return (
    <div className="w-full">
      <div className="flex justify-around gap-20 relative border-b border-neutral-800">
        <button
          onClick={() => setTab("gallery")}
          className={`flex items-center gap-2 pb-3 text-sm ${
            tab === "gallery" ? "text-white" : "text-neutral-500"
          }`}
        >
          <Grid size={18} />
          Gallery
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`flex items-center gap-2 pb-3 text-sm ${
            tab === "saved" ? "text-white" : "text-neutral-500"
          }`}
        >
          <Bookmark size={18} />
          Saved
        </button>

        {/* MOVING UNDERLINE */}
        <span
          className={`absolute bottom-0 h-0.5 w-1/2 bg-white transition-all duration-300 ${tab === "gallery" ? "left-0" : "left-1/2"}`}
        />
      </div>
    </div>
  );
}
