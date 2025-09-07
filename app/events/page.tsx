"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

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
    <main className="embossed-bg min-h-screen">
      <Navbar />
      <section className="container mx-auto py-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-indigo-400">
          Events at Cache2k25
        </h1>

        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Non-Technical Events
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {nonTechnicalEvents.map((event) => (
            <div
              key={event.slug}
              className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition transform hover:-translate-y-2"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover rounded-t-3xl"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">₹{event.amount}</span>
                  <Link
                    href={`/register?event=${encodeURIComponent(event.title)}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
          Technical Events
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicalEvents.map((event) => (
            <div
              key={event.slug}
              className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition transform hover:-translate-y-2"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover rounded-t-3xl"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">₹{event.amount}</span>
                  <Link
                    href={`/register?event=${encodeURIComponent(event.title)}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
