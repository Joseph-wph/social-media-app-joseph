"use client"

import { UploadCloud } from "lucide-react"

type Props = {
  onChange: (file: File) => void
}

export default function ImageUpload({ onChange }: Props) {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    onChange(file)
  }

  return (
    <label className="flex flex-col items-center justify-center border border-dashed border-pink-500 rounded-xl h-40 cursor-pointer bg-[#0b0f19]">

      <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />

      <p className="text-sm text-gray-400">
        <span className="text-purple-400">
          Click to upload
        </span>{" "}
        or drag and drop
      </p>

      <p className="text-xs text-gray-500 mt-1">
        PNG or JPG (max. 5mb)
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

    </label>
  )
}