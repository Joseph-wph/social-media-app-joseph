type Props = {
  stats: {
    posts: number
    followers: number
    following: number
    likes: number
  }
}

export default function ProfileStats({ stats }: Props) {
  return (
    <div className="flex justify-around gap-16 text-center">

      <div>
        <p className="text-lg font-semibold">{stats.posts}</p>
        <p className="text-sm text-gray-400">Post</p>
      </div>

      <div>
        <p className="text-lg font-semibold">{stats.followers}</p>
        <p className="text-sm text-gray-400">Followers</p>
      </div>

      <div>
        <p className="text-lg font-semibold">{stats.following}</p>
        <p className="text-sm text-gray-400">Following</p>
      </div>

      <div>
        <p className="text-lg font-semibold">{stats.likes}</p>
        <p className="text-sm text-gray-400">Likes</p>
      </div>

    </div>
  )
}