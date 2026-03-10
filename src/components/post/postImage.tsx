"use client"

import Image from "next/image"

type Props = {
  image?: string
}

export default function PostImage({ image }: Props) {

  if (!image) return null

  return (
    <div className="rounded-lg overflow-hidden">

      <Image
        src={image}
        alt="post image"
        width={500}
        height={400}
        className="w-full object-cover"
      />

    </div>
  )
}