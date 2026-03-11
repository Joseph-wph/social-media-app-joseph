"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "@/features/users/useUpdateProfile";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const schema = z.object({
  name: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useUpdateProfile();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      phone: user?.phone,
      bio: user?.bio,
    },
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);

    if (data.phone) formData.append("phone", data.phone);
    if (data.bio) formData.append("bio", data.bio);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        router.push("/profile");
      },
    });
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <Link href="/profile">
          <ArrowLeft className="cursor-pointer" />
        </Link>
        <h1 className="text-xl font-semibold">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-10">
        {/* LEFT AVATAR */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-30 h-30 rounded-full overflow-hidden">
            <Image
              src={
                avatarPreview || user?.avatarUrl || "/assets/avatar/avatar.svg"
              }
              alt="avatar"
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={handleChangePhoto}
            className="border px-4 py-2 rounded-full"
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* FORM */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="text-sm">Name</label>
            <input
              {...register("name")}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="text-sm">Username</label>
            <input
              {...register("username")}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              {...register("email")}
              defaultValue={user?.email}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="text-sm">Number Phone</label>
            <input
              {...register("phone")}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="text-sm">Bio</label>
            <textarea
              {...register("bio")}
              rows={4}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3"
            />
          </div>

          <button className="w-full py-3 rounded-full bg-linear-to-r from-purple-600 to-indigo-500 font-semibold">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
