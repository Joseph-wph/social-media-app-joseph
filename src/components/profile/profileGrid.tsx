import Image from "next/image"

type Props = {
  posts: {
    id: number
    imageUrl: string
  }[]
}

export default function ProfileGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">

      {posts.map((post) => (
        <div
          key={post.id}
          className="relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src={post.imageUrl}
            alt="post"
            fill
            className="object-cover hover:scale-105 transition"
          />
        </div>
      ))}

    </div>
  )
}