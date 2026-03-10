"use client"

import { useState } from "react"
import { ArrowLeft, Eye } from "lucide-react"
import ImageUpload from "./imageUpload"
import { useCreatePost } from "@/features/post/useCreatePost"
import { useRouter } from "next/navigation"

export default function CreatePostForm() {

  const router = useRouter()

  const createPost = useCreatePost()

  const [image, setImage] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [preview, setPreview] = useState<string | null>(null)

  const handleImage = (file: File) => {

    setImage(file)

    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()

    if (!image) return

    const formData = new FormData()

    formData.append("image", image)
    formData.append("caption", caption)

    createPost.mutate(formData, {
      onSuccess: () => {
        router.push("/")
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-6">

        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-lg font-semibold">
          Add Post
        </h1>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* PHOTO */}

        <div>

          <label className="text-sm mb-2 block">
            Photo
          </label>

          {!preview ? (
            <ImageUpload onChange={handleImage} />
          ) : (
            <img
              src={preview}
              className="rounded-xl"
            />
          )}

          <p className="text-xs text-pink-500 mt-2">
            Error Text Helper
          </p>

        </div>

        {/* CAPTION */}

        <div>

          <label className="text-sm mb-2 block">
            Caption
          </label>

          <div className="relative">

            <textarea
              value={caption}
              onChange={(e) =>
                setCaption(e.target.value)
              }
              placeholder="Create your caption"
              className="w-full h-28 bg-[#0b0f19] border border-pink-500 rounded-xl p-3 pr-10 resize-none"
            />

            <Eye className="absolute right-3 top-3 w-4 h-4 text-gray-400" />

          </div>

          <p className="text-xs text-pink-500 mt-2">
            Text Helper
          </p>

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 font-semibold"
        >

          {createPost.isPending
            ? "Sharing..."
            : "Share"}

        </button>

      </form>

    </div>
  )
}