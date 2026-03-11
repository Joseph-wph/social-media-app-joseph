"use client"

import { useMyProfile } from "@/features/users/useMyProfile"
import { useMyPosts } from "@/features/users/useMyPosts"

import ProfileHeader from "@/components/profile/profileHeader"
import ProfileStats from "@/components/profile/profileStats"
import ProfileTabs from "@/components/profile/profileTabs"
import ProfileGrid from "@/components/profile/profileGrid"

export default function ProfilePage() {

  const { data: profileData } = useMyProfile()
  const { data: postsData } = useMyPosts()

  if (!profileData) return null

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

      <ProfileHeader profile={profileData.profile} />

      <ProfileStats stats={profileData.stats} />

      <ProfileTabs />

      <ProfileGrid posts={postsData?.items || []} />

    </div>
  )
}