import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="embossed-bg min-h-screen relative overflow-hidden">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <RegisterForm />
      </Suspense>

      {/* The decorative glowing orbs (background layer) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>
    </main>
  );
}