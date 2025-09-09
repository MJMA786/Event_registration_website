"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Orbitron } from 'next/font/google';

// Use Orbitron font for a tech-themed look
const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Register", href: "/register" },
    { name: "Admin Login", href: "/admin" },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 shadow-xl sticky top-0 z-50 transition-all duration-500 ease-in-out">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/navl.png"
            alt="Cache2k25 Logo"
            width={180}
            height={50}
            priority
            className="h-12 w-auto drop-shadow-md"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className={`hidden md:flex items-center gap-6 ${orbitron.variable} font-sans`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative px-4 py-2 font-medium text-white transition-colors duration-300
                ${pathname === item.href ? "text-yellow-300" : "hover:text-white/80"}`}
            >
              {item.name}
              {/* Animated bottom line */}
              <span
                className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-pink-300 transition-all duration-300
                  ${
                    pathname === item.href
                      ? "!w-full !left-0"
                      : "group-hover:w-full group-hover:left-0"
                  }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 relative"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block h-0.5 w-8 bg-white rounded transform transition-all duration-300
                ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
            />
            <span
              className={`block h-0.5 w-8 bg-white rounded my-1 transition-all duration-300
                ${menuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`block h-0.5 w-8 bg-white rounded transform transition-all duration-300
                ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className={`flex flex-col items-center gap-4 ${orbitron.variable} font-sans`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 font-medium text-white w-full text-center transition-all duration-300
                ${pathname === item.href ? "text-yellow-300" : "hover:text-yellow-300"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}