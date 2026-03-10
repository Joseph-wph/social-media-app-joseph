"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterForm } from "@/features/auth/authSchema";
import { register as registerUser } from "@/features/auth/authApi";

import AuthCard from "@/components/auth/authCard";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import RedirectIfAuth from "@/components/auth/RedirectIfAuth";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    await registerUser(data);

    router.push("/login");
  };

  return (
    <RedirectIfAuth>
      <AuthCard title="Register">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("name")}
            placeholder="Enter your name"
            className="input"
          />

          <input
            {...register("username")}
            placeholder="Enter your username"
            className="input"
          />

          <input
            {...register("phone")}
            placeholder="Enter your number phone"
            className="input"
          />

          <input
            {...register("email")}
            placeholder="Enter your email"
            className="input"
          />

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="input"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button className="mt-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 p-2 text-white font-semibold">
            Submit
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400">
            Log in
          </Link>
        </p>
      </AuthCard>
    </RedirectIfAuth>
  );
}
