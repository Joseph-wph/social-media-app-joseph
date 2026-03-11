"use client"

import { UploadCloud, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"

type Props = {
  onChange: (file: File | null) => void
  error?: string
  maxSizeMB?: number
}

export default function ImageUpload({ onChange, error, maxSizeMB = 5 }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | null) => {
    if (!file) return

    // validasi type
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG or PNG allowed")
      onChange(null)
      return
    }

    // validasi size
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`)
      onChange(null)
      return
    }

    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFile(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  // cleanup object URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="relative">
      {!preview ? (
        <label
          htmlFor="file"
          className="flex flex-col items-center justify-center border border-dashed border-neutral-800 rounded-xl h-40 cursor-pointer bg-neutral-900 hover:border-purple-500 transition-colors"
        >
          <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
          <p className="text-sm text-gray-400">
            <span className="text-purple-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG or JPG (max. {maxSizeMB}MB)</p>
          <input
            type="file"
            id="file"
            accept="image/png, image/jpeg"
            className="hidden"
            ref={inputRef}
            onChange={handleChange}
          />
        </label>
      ) : (
        <div className="relative">
          <img src={preview} className="rounded-xl w-full object-cover h-40" />
          <button
            type="button"
            className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  )
}
