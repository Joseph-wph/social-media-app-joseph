export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <img
        src="/assets/background/gradient.svg"
        alt="bg gradient"
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      />

      {children}
    </div>
  );
}
