import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { TicketIcon, CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/solid";

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
  return (
    <>
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-8 min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <TicketIcon className="w-3.5 h-3.5" />
              Your Events
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              My{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Bookings
              </span>
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              All your confirmed and upcoming event bookings in one place.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-500 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-purple-200/40">
                  <TicketIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {booking.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-3.5 h-3.5 text-purple-400" />
                      {booking.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDaysIcon className="w-3.5 h-3.5 text-purple-400" />
                      {booking.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {booking.bookingId} · {booking.tickets}{" "}
                    {booking.tickets > 1 ? "tickets" : "ticket"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-base font-bold text-gray-900">
                    {booking.amount}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
