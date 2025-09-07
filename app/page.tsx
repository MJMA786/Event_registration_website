// app/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="embossed-bg min-h-screen relative overflow-hidden">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center py-32 px-4 md:px-0 relative">
        {/* Aurora Animated Text with Orbitron font */}
        <h1 className="aurora-text text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_5px_15px_rgba(255,255,255,0.25)]">
          Cache2k25
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-xl">
          The Annual Technical & Non-Technical Fest of Our College. Join us to
          explore creativity, innovation, and fun-filled competitions.
        </p>
        <Link
          href="/events"
          className="px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform duration-300"
        >
          Explore Events
        </Link>

        {/* Optional decorative glow orbs */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
      </section>
    </main>
  );
}
