"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
// instead of: import Papa from "papaparse";
const Papa = require("papaparse");

import { saveAs } from "file-saver";

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
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    if (authenticated) {
      const fetchRegistrations = async () => {
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching registrations:", error);
        } else {
          setRegistrations(data || []);
        }
        setLoading(false);
      };
      fetchRegistrations();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("❌ Wrong password!");
    }
  };

  const toggleVerification = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("registrations")
      .update({ payment_verified: !currentStatus })
      .eq("id", id);

    if (error) {
      alert("❌ Error updating payment status: " + error.message);
    } else {
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, payment_verified: !currentStatus } : r
        )
      );
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      filteredRegistrations.map((r) => ({
        Name: r.name,
        Email: r.email,
        Phone: r.phone,
        Event: r.event,
        "Transaction ID": r.transaction_id || "",
        "Payment Screenshot": r.payment_screenshot || "",
        Verified: r.payment_verified ? "Yes" : "No",
        "Registered At": new Date(r.created_at).toLocaleString(),
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `registrations_${new Date().toISOString()}.csv`);
  };

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
      <main className="embossed-bg min-h-screen flex flex-col">
        <Navbar />
        <section className="flex items-center justify-center py-20">
          <form
            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 flex flex-col gap-6"
            onSubmit={handleLogin}
          >
            <h1 className="text-3xl font-extrabold text-teal-600 text-center">
              Admin Login
            </h1>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-900 font-medium"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition"
            >
              Login
            </button>
          </form>
        </section>
      </main>
    );
  }

  // --- Admin Dashboard ---
  return (
    <main className="embossed-bg min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-10">
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 w-full">
  <h1 className="text-3xl font-extrabold text-teal-600">
    Admin Dashboard
  </h1>

  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto bg-white p-4 rounded-2xl shadow-md">
    <input
      type="text"
      placeholder="Search by name, email or event"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      className="w-full sm:w-auto px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm text-gray-900 font-medium bg-white"
    />

    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      className="w-full sm:w-auto px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition shadow-sm text-gray-900 font-medium bg-white"
    >
      <option value="all">All</option>
      <option value="verified">Verified</option>
      <option value="pending">Pending</option>
    </select>

    <button
      onClick={exportToCSV}
      className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition shadow"
    >
      ⬇ Export CSV
    </button>
  </div>
</div>



        <div className="overflow-x-auto rounded-3xl shadow-xl bg-white">
          {loading ? (
            <p className="p-6 text-center text-gray-600">
              Loading registrations...
            </p>
          ) : filteredRegistrations.length === 0 ? (
            <p className="p-6 text-center text-gray-600">
              No registrations found.
            </p>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead className="bg-teal-100">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Phone",
                    "Event",
                    "Txn ID",
                    "Screenshot",
                    "Verified",
                    "Registered At",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-teal-800 font-semibold text-sm uppercase tracking-wide"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((r, i) => (
                  <tr
                    key={r.id}
                    className="bg-white shadow-sm hover:shadow-md rounded-xl transition"
                  >
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {r.name}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{r.email}</td>
                    <td className="px-4 py-3 text-gray-900">{r.phone}</td>
                    <td className="px-4 py-3 text-gray-900">{r.event}</td>
                    <td className="px-4 py-3 text-gray-900">
                      {r.transaction_id || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {r.payment_screenshot ? (
                        <a
                          href={r.payment_screenshot}
                          target="_blank"
                          className="text-teal-600 underline hover:text-teal-800 font-semibold"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">
                          No screenshot
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          toggleVerification(r.id, !!r.payment_verified)
                        }
                        className={`px-3 py-1 rounded-lg text-white font-semibold ${
                          r.payment_verified
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-500 hover:bg-red-600"
                        } transition`}
                      >
                        {r.payment_verified ? "Verified" : "Pending"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
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
