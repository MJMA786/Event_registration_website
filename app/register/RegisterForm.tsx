"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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

    let screenshotUrl = null;

    if (screenshot) {
      const fileName = `${form.event}/${form.name}-${Date.now()}-${screenshot.name}`;
      const { data, error } = await supabase.storage
        .from("payments")
        .upload(fileName, screenshot);

      if (error) {
        alert("❌ Error uploading screenshot: " + error.message);
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
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section className="flex-1 flex items-center justify-center px-4">
      {!submitted ? (
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full">
          <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-4">
            Register for Cache2k25
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Fill in your details below to register for your favorite event. Upload your UPI transaction screenshot to confirm payment.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="bg-gray-50 text-gray-900 placeholder-gray-500 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-gray-50 text-gray-900 placeholder-gray-500 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="bg-gray-50 text-gray-900 placeholder-gray-500 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <select
              name="event"
              value={form.event}
              onChange={handleChange}
              className="bg-gray-50 text-gray-900 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select Event</option>
              <option value="Photography Contest">Photography Contest</option>
              <option value="Live Drawing">Live Drawing</option>
              <option value="Tech Meme Contest">Tech Meme Contest</option>
              <option value="BGMI Esports Tournament">BGMI Esports Tournament</option>
              <option value="FreeFire Esports Championship">FreeFire Esports Championship</option>
              <option value="Web Development Challenge">Web Development Challenge</option>
              <option value="Poster Presentation">Poster Presentation</option>
              <option value="Tech Expo">Tech Expo</option>
              <option value="PyMaster Contest">PyMaster Contest</option>
              <option value="Technical Quiz">Technical Quiz</option>
            </select>
            <input
              type="text"
              name="transaction_id"
              value={form.transaction_id}
              onChange={handleChange}
              placeholder="UPI Transaction ID"
              className="bg-gray-50 text-gray-900 placeholder-gray-500 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-gray-50 text-gray-900 border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition mt-2"
            >
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Registration Successful 🎉
          </h1>
          <p className="text-gray-700">
            Your registration has been received. We’ll verify your payment and confirm soon.
          </p>
        </div>
      )}
    </section>
  );
}