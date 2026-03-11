"use client";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-105 rounded-xl border border-white/10 bg-black/60 backdrop-blur p-8 shadow-xl">
      <div className="flex flex-col items-center mb-6">
        <div className="flex gap-2">
          <img src="/assets/logo/logo.svg" alt="logo" className="w-6 h-6" />
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            Sociality
          </div>
        </div>

        <h2 className="text-lg text-white font-bold mt-3">{title}</h2>
      </div>

      {children}
    </div>
  );
}
