// app/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Orbitron } from 'next/font/google';
import ParticleBackground from "@/components/ParticleBackground";

const orbitron = Orbitron({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-orbitron",
});

export default function Home() {
    return (
        <main className="embossed-bg min-h-screen relative overflow-hidden">
            <Navbar />
            
            {/* New: The decorative particle effect background */}
            <ParticleBackground />

            {/* Main content, with higher z-index to be on top */}
            <section className="flex flex-col items-center justify-center text-center py-32 px-4 md:px-0 relative z-10">
                {/* Aurora Animated Text with Orbitron font */}
                <h1 className={`aurora-text text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_5px_15px_rgba(255,255,255,0.25)] ${orbitron.className}`}>
                    Cache 2025
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-xl">
                    The Annual Technical & Non-Technical Fest of Our College. Join us to
                    explore creativity, innovation, and fun-filled competitions.
                </p>

                <Link
                    href="/events"
                    prefetch={false}
                    className="px-8 py-4 bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold text-lg rounded-2xl shadow-lg ring-1 ring-white/5 hover:scale-105 transition-transform duration-300"
                >
                    Explore Events
                </Link>
            </section>
        </main>
    );
}