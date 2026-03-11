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
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      await registerUser(data);
      setLoading(false);
      router.push("/login");
    } catch (err) {
      setLoading(false);
      console.error("Register error", err);
      alert("Registration failed. Please check your inputs or try again.");
    }
  };

  return (
    <RedirectIfAuth>
      <AuthCard title="Register">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-bold text-gray-300">Name</label>
            <input
              {...register("name")}
              placeholder="Enter your name"
              className="input mt-1"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-sm font-bold text-gray-300">Username</label>
            <input
              {...register("username")}
              placeholder="Enter your username"
              className="input mt-1"
            />
            {errors.username && (
              <p className="text-red-400 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-bold text-gray-300">Phone Number</label>
            <input
              {...register("phone")}
              placeholder="Enter your phone number"
              className="input mt-1"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs">{errors.phone.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-bold text-gray-300">Email</label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="input mt-1"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm font-bold text-gray-300">Password</label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input mt-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label className="text-sm font-bold text-gray-300">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="input mt-1"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="mt-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 p-2 text-white font-semibold"
          >
            {loading ? "Registering..." : "Submit"}
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
