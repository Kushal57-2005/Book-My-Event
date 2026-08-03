import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { TicketIcon, CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import BookingCardSkeleton from "../events/BookingCardSkeleton";
import Card3D from "../common/Card3D";

const bookings = [
  {
    id: 1,
    name: "Arijit Singh Live in Concert",
    location: "Mumbai, Maharashtra",
    date: "Sat, Mar 15 • 7:00 PM",
    tickets: 2,
    status: "confirmed",
    bookingId: "BME-2026-00142",
    amount: "₹4,500",
  },
  {
    id: 2,
    name: "Web Development Workshop",
    location: "Pune, Maharashtra",
    date: "Mon, Mar 20 • 10:00 AM",
    tickets: 1,
    status: "confirmed",
    bookingId: "BME-2026-00187",
    amount: "Free",
  },
  {
    id: 3,
    name: "Holi Color Festival 2026",
    location: "Delhi, NCR",
    date: "Thu, Mar 25 • 9:00 AM",
    tickets: 4,
    status: "pending",
    bookingId: "BME-2026-00201",
    amount: "₹1,200",
  },
];

export default function MyBookings() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(bookings);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-32 pb-20 px-4 sm:px-8 min-h-screen bg-[#fbfbf9]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              <TicketIcon className="w-3.5 h-3.5" />
              Verified Event Passes
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-3">
              My <span className="text-amber-600">Bookings</span>
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              All your confirmed and reserved event passes in one place.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <BookingCardSkeleton key={i} />
              ))
            ) : data.map((booking) => (
              <Card3D key={booking.id} className="w-full">
                <div
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 bg-stone-900 border border-stone-800 rounded-xl flex items-center justify-center shrink-0 text-amber-400">
                    <TicketIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-stone-900 truncate">
                      {booking.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs font-medium text-stone-500">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="w-3.5 h-3.5 text-stone-400" />
                        {booking.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-3.5 h-3.5 text-stone-400" />
                        {booking.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 font-mono">
                      {booking.bookingId} · {booking.tickets}{" "}
                      {booking.tickets > 1 ? "passes" : "pass"}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm font-extrabold text-stone-900">
                      {booking.amount}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        booking.status === "confirmed"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-amber-50 border-amber-200 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
