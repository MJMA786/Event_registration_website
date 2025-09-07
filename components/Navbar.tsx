// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
    <header className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0 relative">
        {/* Logo instead of text */}
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
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-3 py-1 font-semibold text-white transition-colors duration-300 ${
                pathname === item.href
                  ? "text-yellow-200"
                  : "hover:text-pink-200"
              }`}
            >
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 w-full bg-pink-300 transition-all duration-300 ${
                  pathname === item.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 relative z-50"
          >
            <span
              className={`block h-0.5 w-8 bg-white rounded transform transition duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-8 bg-white rounded my-1 transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-8 bg-white rounded transform transition duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 font-medium text-white w-full text-center transition-colors duration-300 ${
                pathname === item.href
                  ? "text-yellow-200"
                  : "hover:text-pink-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
