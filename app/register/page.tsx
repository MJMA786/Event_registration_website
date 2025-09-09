import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="embossed-bg min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}