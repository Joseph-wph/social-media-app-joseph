"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RedirectIfAuth from "@/components/auth/RedirectIfAuth";

import { loginSchema, LoginForm } from "@/features/auth/authSchema";
import { useLogin } from "@/features/auth/useLogin";

import AuthCard from "@/components/auth/authCard";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    await loginMutation.mutateAsync(data);

    router.push("/feed");
  };

  return (
    <RedirectIfAuth>
      <AuthCard title="Welcome Back!">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-300">Email</label>

            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full mt-1 rounded-md bg-black border border-gray-700 p-2 text-white"
            />

            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm font-bold text-gray-300">Password</label>

            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full mt-1 rounded-md bg-black border border-gray-700 p-2 text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={loginMutation.isPending}
            className="mt-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 p-2 text-white font-semibold"
          >
            {loginMutation.isPending ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-purple-400">
            Register
          </Link>
        </p>
      </AuthCard>
    </RedirectIfAuth>
  );
}
