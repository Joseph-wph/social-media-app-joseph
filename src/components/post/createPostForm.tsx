"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import ImageUpload from "./imageUpload"
import { useCreatePost } from "@/features/post/useCreatePost"
import { useRouter } from "next/navigation"

export default function CreatePostForm() {
  const router = useRouter()
  const createPost = useCreatePost()

  const [image, setImage] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      setError("Image is required")
      return
    }

    setError("") // reset error

    const formData = new FormData()
    formData.append("image", image)
    formData.append("caption", caption)

    createPost.mutate(formData, {
      onSuccess: () => router.push("/"),
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Add Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PHOTO */}
        <div>
          <label className="text-sm mb-2 block">Photo</label>
          <ImageUpload onChange={setImage} error={error} />
        </div>

        {/* CAPTION */}
        <div>
          <label className="text-sm mb-2 block">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Create your caption"
            className="w-full h-28 bg-neutral-900 border border-neutral-800 rounded-xl p-3 resize-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 font-semibold"
        >
          {createPost.isPending ? "Sharing..." : "Share"}
        </button>
      </form>
    </div>
  )
}