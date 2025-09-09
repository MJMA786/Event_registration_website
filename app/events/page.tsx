"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { Orbitron } from 'next/font/google';

// Use Orbitron font for a tech-themed look
const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

interface Event {
  title: string;
  description: string;
  amount: number;
  slug: string;
  image: string;
}

const nonTechnicalEvents: Event[] = [
  { title: "Photography Contest", description: "Showcase your photography skills and win exciting prizes.", amount: 50, slug: "photography-contest", image: "/imgs/pc.jpg" },
  { title: "Live Drawing", description: "Compete in a live drawing challenge to impress the judges.", amount: 50, slug: "live-drawing", image: "/imgs/ld.jpg" },
  { title: "Tech Meme Contest", description: "Create hilarious tech memes and get recognized for creativity.", amount: 50, slug: "tech-meme-contest", image: "/imgs/tm.jpg" },
  { title: "BGMI Esports Tournament", description: "Battle it out in BGMI and show your esports skills.", amount: 200, slug: "bgmi-esports", image: "/imgs/bgmi.jpg" },
  { title: "FreeFire Esports Championship", description: "Join the FreeFire Championship and win glory.", amount: 200, slug: "freefire-championship", image: "/imgs/ff.jpg" },
];

const technicalEvents: Event[] = [
  { title: "Web Development Challenge", description: "Build a web app within limited time and showcase your coding skills.", amount: 100, slug: "web-dev-challenge", image: "/imgs/wd.jpg" },
  { title: "Poster Presentation", description: "Present your technical research in an innovative poster format.", amount: 100, slug: "poster-presentation", image: "/imgs/pp.jpg" },
  { title: "Tech Expo", description: "Showcase innovative technical projects to the community.", amount: 100, slug: "tech-expo", image: "/imgs/te.jpeg" },
  { title: "PyMaster Contest", description: "Solve Python challenges and prove your mastery.", amount: 50, slug: "pymaster-contest", image: "/imgs/pmc.jpg" },
  { title: "Technical Quiz", description: "Test your technical knowledge and win amazing prizes.", amount: 100, slug: "technical-quiz", image: "/imgs/tq.jpg" },
];

export default function EventsPage() {
  return (
    <main className="embossed-bg min-h-screen relative overflow-hidden">
      <Navbar />
      <section className="container mx-auto py-16 px-4 relative z-10">
        <h1 className={`text-4xl sm:text-5xl font-extrabold mb-12 text-center text-white drop-shadow-md ${orbitron.className}`}>
          Events at Cache2k25
        </h1>

        <h2 className={`text-2xl font-semibold mb-6 text-indigo-300 drop-shadow-sm ${orbitron.className}`}>
          Non-Technical Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {nonTechnicalEvents.map((event) => (
            <div
              key={event.slug}
              className="relative group bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover rounded-t-3xl transition-all duration-300" // Removed blur-[1px]
              />
              <div className="p-6">
                <h3 className={`text-xl font-bold text-white mb-2 ${orbitron.className}`}>{event.title}</h3>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-lg">₹{event.amount}</span>
                  <Link
                    href={`/register?event=${encodeURIComponent(event.title)}`}
                    className="px-5 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              </div>
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl z-20 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(45deg, rgba(139, 92, 246, 0.4) 0%, rgba(255, 255, 255, 0) 50%, rgba(236, 72, 153, 0.4) 100%)',
                backgroundSize: '200% 200%',
                backgroundPosition: '50% 50%',
                opacity: 0,
                transition: 'opacity 0.5s ease',
              }}></div>
              <style jsx>{`
                .group:hover .absolute.inset-0.rounded-3xl {
                  opacity: 1;
                  animation: glow 2s ease-in-out infinite;
                }
                @keyframes glow {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>
            </div>
          ))}
        </div>

        <h2 className={`text-2xl font-semibold mb-6 text-indigo-300 drop-shadow-sm ${orbitron.className}`}>
          Technical Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicalEvents.map((event) => (
            <div
              key={event.slug}
              className="relative group bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover rounded-t-3xl transition-all duration-300" // Removed blur-[1px]
              />
              <div className="p-6">
                <h3 className={`text-xl font-bold text-white mb-2 ${orbitron.className}`}>{event.title}</h3>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-lg">₹{event.amount}</span>
                  <Link
                    href={`/register?event=${encodeURIComponent(event.title)}`}
                    className="px-5 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              </div>
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl z-20 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(45deg, rgba(139, 92, 246, 0.4) 0%, rgba(255, 255, 255, 0) 50%, rgba(236, 72, 153, 0.4) 100%)',
                backgroundSize: '200% 200%',
                backgroundPosition: '50% 50%',
                opacity: 0,
                transition: 'opacity 0.5s ease',
              }}></div>
              <style jsx>{`
                .group:hover .absolute.inset-0.rounded-3xl {
                  opacity: 1;
                  animation: glow 2s ease-in-out infinite;
                }
                @keyframes glow {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>
            </div>
          ))}
        </div>
      </section>

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