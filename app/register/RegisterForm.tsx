"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultEvent = searchParams.get("event") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event: defaultEvent,
    transaction_id: "",
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultEvent) setForm((prev) => ({ ...prev, event: defaultEvent }));
  }, [defaultEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let screenshotUrl = null;

    if (screenshot) {
      const fileName = `${form.event}/${form.name}-${Date.now()}-${screenshot.name}`;
      const { data, error } = await supabase.storage
        .from("payments")
        .upload(fileName, screenshot);

      if (error) {
        alert("❌ Error uploading screenshot: " + error.message);
        setLoading(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("payments")
        .getPublicUrl(fileName);

      screenshotUrl = publicUrl.publicUrl;
    }

    const { error } = await supabase.from("registrations").insert([
      {
        ...form,
        payment_screenshot: screenshotUrl,
      },
    ]);

    if (error) {
      alert("❌ Error: " + error.message);
      setLoading(false);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section className="flex-1 flex items-center justify-center p-4 md:p-8">
      {!submitted ? (
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-10 max-w-xl w-full text-white">
          <h1 className={`text-4xl md:text-5xl font-extrabold text-white text-center mb-4 drop-shadow-lg ${orbitron.className}`}>
            Register for an Event
          </h1>
          <p className="text-gray-200 text-center mb-8">
            Fill in your details to secure your spot. Upload your UPI transaction screenshot to confirm your payment.
          </p>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="bg-white/5 text-white placeholder-gray-400 border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white/5 text-white placeholder-gray-400 border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="bg-white/5 text-white placeholder-gray-400 border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <select
              name="event"
              value={form.event}
              onChange={handleChange}
              className="bg-white/5 text-white border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            >
              <option value="" className="bg-gray-800">Select Event</option>
              <option value="Photography Contest" className="bg-gray-800">Photography Contest</option>
              <option value="Live Drawing" className="bg-gray-800">Live Drawing</option>
              <option value="Tech Meme Contest" className="bg-gray-800">Tech Meme Contest</option>
              <option value="BGMI Esports Tournament" className="bg-gray-800">BGMI Esports Tournament</option>
              <option value="FreeFire Esports Championship" className="bg-gray-800">FreeFire Esports Championship</option>
              <option value="Web Development Challenge" className="bg-gray-800">Web Development Challenge</option>
              <option value="Poster Presentation" className="bg-gray-800">Poster Presentation</option>
              <option value="Tech Expo" className="bg-gray-800">Tech Expo</option>
              <option value="PyMaster Contest" className="bg-gray-800">PyMaster Contest</option>
              <option value="Technical Quiz" className="bg-gray-800">Technical Quiz</option>
            </select>
            <input
              type="text"
              name="transaction_id"
              value={form.transaction_id}
              onChange={handleChange}
              placeholder="UPI Transaction ID"
              className="bg-white/5 text-white placeholder-gray-400 border border-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <label className="text-gray-300">Upload Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-white/5 text-white border border-gray-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition mt-4 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-10 max-w-lg w-full text-center text-white">
          <h1 className={`text-3xl font-bold text-green-400 mb-4 ${orbitron.className}`}>
            Registration Successful 🎉
          </h1>
          <p className="text-gray-200">
            Your registration has been received. We’ll verify your payment and confirm your spot soon.
          </p>
        </div>
      )}
    </section>
  );
}