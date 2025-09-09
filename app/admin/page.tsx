"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { Orbitron } from 'next/font/google';

// Use Orbitron font for a tech-themed look
const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

// Interface defining the structure of a registration record
interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  transaction_id?: string;
  payment_screenshot?: string;
  payment_verified?: boolean;
  created_at: string;
}

export default function AdminPage() {
  // State management
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'verified', or 'pending'

  // Fetch the admin password from environment variables
  // WARNING: This is a client-side component. Using NEXT_PUBLIC_ADMIN_PASSWORD here
  // exposes the password to the public. For production, consider a secure server-side check.
  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  // Effect to fetch registration data once authenticated
  useEffect(() => {
    if (authenticated) {
      const fetchRegistrations = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching registrations:", error);
          alert("❌ Could not fetch registrations.");
        } else {
          setRegistrations(data || []);
        }
        setLoading(false);
      };
      fetchRegistrations();
    }
  }, [authenticated]);

  // Handler for the login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("❌ Wrong password!");
    }
  };

  // Toggles the payment verification status for a registration
  const toggleVerification = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("registrations")
      .update({ payment_verified: !currentStatus })
      .eq("id", id);

    if (error) {
      alert("❌ Error updating payment status: " + error.message);
    } else {
      // Update local state to reflect the change immediately
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, payment_verified: !currentStatus } : r
        )
      );
    }
  };

  // Exports the currently filtered registration data to a CSV file
  const exportToCSV = () => {
    const csvData = filteredRegistrations.map((r) => ({
      Name: r.name,
      Email: r.email,
      Phone: r.phone,
      Event: r.event,
      "Transaction ID": r.transaction_id || "N/A",
      "Payment Screenshot URL": r.payment_screenshot || "N/A",
      "Payment Verified": r.payment_verified ? "Yes" : "No",
      "Registered At": new Date(r.created_at).toLocaleString(),
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `registrations_${new Date().toISOString()}.csv`);
  };

  // Derived state for filtered registrations based on search and status filters
  const filteredRegistrations = registrations.filter((r) => {
    const matchesText = [r.name, r.email, r.event]
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "verified" && r.payment_verified) ||
      (filterStatus === "pending" && !r.payment_verified);

    return matchesText && matchesStatus;
  });

  // --- Login Screen ---
  if (!authenticated) {
    return (
      <main className="embossed-bg min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
        </div>
        <form
          className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-10 flex flex-col gap-6"
          onSubmit={handleLogin}
        >
          <h1 className={`text-3xl font-extrabold text-white text-center drop-shadow-lg ${orbitron.className}`}>
            Admin Login
          </h1>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 text-white placeholder-gray-400 border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 transition shadow-md"
          >
            Login
          </button>
        </form>
      </main>
    );
  }

  // --- Admin Dashboard ---
  return (
    <main className="embossed-bg min-h-screen flex flex-col">
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
        </div>
      <Navbar />
      <section className="container mx-auto py-10 px-4 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 w-full">
          <h1 className={`text-3xl font-extrabold text-indigo-400 drop-shadow-md ${orbitron.className}`}>
            Admin Dashboard
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-md">
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm text-white font-medium bg-white/5 border border-gray-700 placeholder-gray-400"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm text-white font-medium bg-white/5 border border-gray-700"
            >
              <option value="all" className="bg-gray-800">All Statuses</option>
              <option value="verified" className="bg-gray-800">Verified</option>
              <option value="pending" className="bg-gray-800">Pending</option>
            </select>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 font-semibold transition shadow"
            >
              ⬇ Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl shadow-xl bg-white/10 backdrop-blur-md">
          {loading ? (
            <p className="p-6 text-center text-gray-400">Loading registrations...</p>
          ) : filteredRegistrations.length === 0 ? (
            <p className="p-6 text-center text-gray-400">No registrations found.</p>
          ) : (
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-white/10 text-gray-300">
                  <th className="px-4 py-3 text-sm uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-sm uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-sm uppercase tracking-wider hidden sm:table-cell">Phone</th>
                  <th className="px-4 py-3 text-sm uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 text-sm uppercase tracking-wider hidden md:table-cell">Txn ID</th>
                  <th className="px-4 py-3 text-sm uppercase tracking-wider">Screenshot</th>
                  <th className="px-4 py-3 text-sm uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-sm uppercase tracking-wider hidden lg:table-cell">Registered At</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-700 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{r.name}</td>
                    <td className="px-4 py-3 text-gray-300 hidden sm:table-cell">{r.email}</td>
                    <td className="px-4 py-3 text-gray-300 hidden sm:table-cell">{r.phone}</td>
                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{r.event}</td>
                    <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{r.transaction_id || "-"}</td>
                    <td className="px-4 py-3">
                      {r.payment_screenshot ? (
                        <a
                          href={r.payment_screenshot}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 underline hover:text-teal-200 font-semibold"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">None</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleVerification(r.id, !!r.payment_verified)}
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                          r.payment_verified
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-500 hover:bg-red-600"
                        } transition`}
                      >
                        {r.payment_verified ? "VERIFIED" : "PENDING"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-300 hidden lg:table-cell whitespace-nowrap">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}