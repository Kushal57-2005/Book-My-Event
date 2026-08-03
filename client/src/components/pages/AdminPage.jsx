import { useState } from "react";
import Navbar from "../layout/Navbar";
import Card3D from "../common/Card3D";
import { createEventApi } from "../../api/events";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  SparklesIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    img: "",
    time: "07:00 PM",
    daysFromNow: 7,
    type: "music",
    info: "",
    isPaid: true,
    price: 500,
    seatArrengement: true,
    seatCount: 20,
    seatAvailable: 20,
  });

  const [seatConfig, setSeatConfig] = useState({
    rows: 2,
    columns: 10,
    tiers: [
      { name: "VIP", price: 1000, rows: ["A"] },
      { name: "General", price: 500, rows: ["B"] },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTierChange = (index, field, value) => {
    const updated = [...seatConfig.tiers];
    if (field === "rows") {
      updated[index][field] = value
        .split(",")
        .map((r) => r.trim().toUpperCase())
        .filter(Boolean);
    } else if (field === "price") {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value;
    }
    setSeatConfig((prev) => ({ ...prev, tiers: updated }));
  };

  const addTier = () => {
    setSeatConfig((prev) => ({
      ...prev,
      tiers: [...prev.tiers, { name: "Tier " + (prev.tiers.length + 1), price: 500, rows: ["C"] }],
    }));
  };

  const removeTier = (index) => {
    setSeatConfig((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        ...form,
        daysFromNow: Number(form.daysFromNow),
        seatCount: Number(form.seatCount),
        seatAvailable: Number(form.seatAvailable),
        price: form.isPaid ? Number(form.price) : 0,
      };

      if (form.seatArrengement) {
        payload.seatConfig = {
          rows: Number(seatConfig.rows),
          columns: Number(seatConfig.columns),
          tiers: seatConfig.tiers,
        };
      }

      await createEventApi(payload);
      setSuccess(true);
      setForm({
        name: "",
        location: "",
        img: "",
        time: "07:00 PM",
        daysFromNow: 7,
        type: "music",
        info: "",
        isPaid: true,
        price: 500,
        seatArrengement: true,
        seatCount: 20,
        seatAvailable: 20,
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create event. Make sure you are logged in as Admin.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fbfbf9] pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Banner */}
          <div className="bg-stone-900 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-stone-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-400 text-stone-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Admin Panel
                </span>
                <span className="text-stone-400 text-xs font-semibold">
                  Event Creator & Management
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Upload New Event
              </h1>
            </div>
            <div className="flex items-center gap-2 text-stone-400 text-xs font-medium bg-stone-800/80 px-4 py-2 rounded-2xl border border-stone-700">
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              Changes publish live instantly
            </div>
          </div>

          {success && (
            <div className="mb-6 bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Event Uploaded Successfully!</h4>
                  <p className="text-xs text-emerald-700">
                    Your event has been saved and is now live on the platform.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="text-xs font-extrabold uppercase px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
              >
                Dismiss
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-300 text-rose-900 p-4 rounded-2xl text-xs font-bold shadow-sm animate-fadeIn">
              ⚠️ {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
                  1. General Event Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Sunburn Campus Fest 2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Location / Venue *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. NSCI Dome, Mumbai"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Event Category *
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 capitalize"
                    >
                      <option value="music">Music</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="education">Education</option>
                      <option value="cultural">Cultural</option>
                      <option value="spiritual">Spiritual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      placeholder="e.g. 07:00 PM"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Days From Now *
                    </label>
                    <input
                      type="number"
                      name="daysFromNow"
                      value={form.daysFromNow}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Image Banner URL *
                  </label>
                  <input
                    type="url"
                    name="img"
                    value={form.img}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Event Description / Info *
                  </label>
                  <textarea
                    name="info"
                    rows="3"
                    value={form.info}
                    onChange={handleChange}
                    placeholder="Provide details about the event, guest artists, rules, etc."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400"
                    required
                  />
                </div>

                <h3 className="text-lg font-black text-stone-900 border-b border-stone-100 pb-3 pt-2">
                  2. Pricing & Capacity
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <input
                      type="checkbox"
                      id="isPaid"
                      name="isPaid"
                      checked={form.isPaid}
                      onChange={handleChange}
                      className="w-4 h-4 text-amber-500 rounded border-stone-300 focus:ring-amber-400"
                    />
                    <label
                      htmlFor="isPaid"
                      className="text-xs font-bold uppercase text-stone-800 cursor-pointer"
                    >
                      Ticketed Event (Paid)
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Base Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      disabled={!form.isPaid}
                      min="0"
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Total Capacity / Seats
                    </label>
                    <input
                      type="number"
                      name="seatCount"
                      value={form.seatCount}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          seatCount: val,
                          seatAvailable: val,
                        }));
                      }}
                      min="1"
                      className="w-full px-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-sm"
                      required
                    />
                  </div>
                </div>

                <h3 className="text-lg font-black text-stone-900 border-b border-stone-100 pb-3 pt-2">
                  3. Seating Arrangement & Tiers
                </h3>

                <div className="flex items-center gap-3 bg-amber-50/60 border border-amber-200 p-3.5 rounded-2xl">
                  <input
                    type="checkbox"
                    id="seatArrengement"
                    name="seatArrengement"
                    checked={form.seatArrengement}
                    onChange={handleChange}
                    className="w-4 h-4 text-amber-500 rounded border-stone-300 focus:ring-amber-400"
                  />
                  <label
                    htmlFor="seatArrengement"
                    className="text-xs font-bold text-stone-900 cursor-pointer"
                  >
                    Enable Seat Map & Tier Selection for this Event
                  </label>
                </div>

                {form.seatArrengement && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                          Total Rows
                        </label>
                        <input
                          type="number"
                          value={seatConfig.rows}
                          onChange={(e) =>
                            setSeatConfig((prev) => ({
                              ...prev,
                              rows: e.target.value,
                            }))
                          }
                          min="1"
                          max="26"
                          className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                          Columns per Row
                        </label>
                        <input
                          type="number"
                          value={seatConfig.columns}
                          onChange={(e) =>
                            setSeatConfig((prev) => ({
                              ...prev,
                              columns: e.target.value,
                            }))
                          }
                          min="1"
                          className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold uppercase text-stone-800">
                          Tier Configuration
                        </span>
                        <button
                          type="button"
                          onClick={addTier}
                          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                        >
                          <PlusIcon className="w-3.5 h-3.5" /> Add Tier
                        </button>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {seatConfig.tiers.map((tier, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-stone-200"
                          >
                            <input
                              type="text"
                              value={tier.name}
                              onChange={(e) =>
                                handleTierChange(idx, "name", e.target.value)
                              }
                              placeholder="Tier Name (e.g. VIP)"
                              className="w-1/3 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-bold"
                            />
                            <input
                              type="number"
                              value={tier.price}
                              onChange={(e) =>
                                handleTierChange(idx, "price", e.target.value)
                              }
                              placeholder="Price"
                              className="w-1/4 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs"
                            />
                            <input
                              type="text"
                              value={tier.rows.join(", ")}
                              onChange={(e) =>
                                handleTierChange(idx, "rows", e.target.value)
                              }
                              placeholder="Rows (e.g. A, B)"
                              className="flex-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs"
                            />
                            {seatConfig.tiers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeTier(idx)}
                                className="text-stone-400 hover:text-rose-600 p-1"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-stone-950 bg-amber-400 border border-amber-300 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Publishing Event..." : "Publish Event Live"}
                </button>
              </form>
            </div>

            {/* Right Column: Card Preview */}
            <div className="lg:col-span-4 sticky top-28">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <TicketIcon className="w-4 h-4 text-amber-500" />
                Live Card Preview
              </h3>

              <Card3D className="w-full">
                <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-lg flex flex-col">
                  <div className="relative h-48 bg-stone-800 overflow-hidden">
                    {form.img ? (
                      <img
                        src={form.img}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs font-semibold">
                        Image Preview Area
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-stone-700">
                      {form.type}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-stone-900 text-xs font-black px-2.5 py-1 rounded-full shadow">
                      {form.isPaid ? `₹${form.price}` : "Free"}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-2">
                    <h4 className="font-extrabold text-base text-stone-900 leading-snug">
                      {form.name || "Event Title Preview"}
                    </h4>
                    <p className="text-xs text-stone-500 font-medium truncate">
                      📍 {form.location || "Venue Location"}
                    </p>
                    <p className="text-xs text-stone-400">
                      ⏰ {form.time} • {form.daysFromNow} days away
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                      {form.info || "Event description preview will appear here..."}
                    </p>

                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-bold">
                      <span>{form.seatCount} Total Seats</span>
                      <span>
                        {form.seatArrengement ? "Seated Map" : "Open Admission"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
