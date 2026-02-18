import { useState, useMemo } from "react";
import {
  XMarkIcon,
  TicketIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
function generateSeatMap(seatCount, seatAvailable) {
  const COLS = 12;
  const rows = Math.ceil(seatCount / COLS);
  const totalSeats = rows * COLS;
  const bookedCount = seatCount - seatAvailable;

  // Build flat list then mark random ones as booked
  const flat = Array.from({ length: totalSeats }, (_, i) => ({
    id: i,
    row: String.fromCharCode(65 + Math.floor(i / COLS)), // A, B, C …
    col: (i % COLS) + 1,
    status: i < seatCount ? "available" : "gap", // seats beyond seatCount are gaps
  }));

  // Randomly book seats
  const availableIndices = flat
    .map((s, i) => (s.status === "available" ? i : null))
    .filter((i) => i !== null);
  const shuffled = [...availableIndices].sort(() => Math.random() - 0.5);
  shuffled.slice(0, bookedCount).forEach((i) => {
    flat[i].status = "booked";
  });

  // Group into rows
  const rowMap = [];
  for (let r = 0; r < rows; r++) {
    rowMap.push(flat.slice(r * COLS, r * COLS + COLS));
  }
  return rowMap;
}
const seatStyles = {
  available:
    "bg-gray-200 hover:bg-purple-200 hover:scale-110 cursor-pointer border border-gray-300 hover:border-purple-400",
  selected:
    "bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-400/40 scale-110 cursor-pointer border border-purple-400 animate-seatPulse",
  booked:
    "bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600 opacity-60",
  gap: "invisible",
};

const MAX_TICKETS = 10;
export default function SeatSelection({ event, onClose, onBack }) {
  const [selected, setSelected] = useState([]);
  const [quantity, setQuantity] = useState(1); // for non-arranged events
  const [confirmed, setConfirmed] = useState(false);
  const [limitToast, setLimitToast] = useState(false);

  const seatsAvailable = Number(event.seatAvailable ?? 0);
  const hasArrangement = event.seatArrengement === true;

  const seatMap = useMemo(
    () =>
      hasArrangement
        ? generateSeatMap(event.seatCount, seatsAvailable)
        : [],
    [event.seatCount, seatsAvailable, hasArrangement]
  );
  const maxBookable = Math.min(MAX_TICKETS, seatsAvailable);

  const flashLimitToast = () => {
    setLimitToast(true);
    setTimeout(() => setLimitToast(false), 2500);
  };
  const toggleSeat = (seat) => {
    if (seat.status !== "available") return;
    const key = `${seat.row}${seat.col}`;
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((s) => s !== key);
      if (prev.length >= maxBookable) {
        flashLimitToast();
        return prev;
      }
      return [...prev, key];
    });
  };
  const isSelected = (seat) => selected.includes(`${seat.row}${seat.col}`);
  const ticketCount = hasArrangement ? selected.length : quantity;
  const totalPrice = event.isPaid ? ticketCount * event.price : 0;
  const handleConfirm = () => {
    const booking = {
      eventId: event.id,
      eventName: event.name,
      location: event.location,
      seats: hasArrangement ? selected : [],
      ticketCount,
      totalPrice,
      bookedAt: new Date().toISOString(),
      bookingId: `BME-${Date.now().toString(36).toUpperCase()}`,
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("bme_bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bme_bookings", JSON.stringify(existing));

    setConfirmed(true);
  };
  if (confirmed) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 animate-fadeIn">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
        <div className="relative bg-white rounded-3xl shadow-2xl p-10 text-center max-w-sm w-full animate-scaleIn z-50">
          <button
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-all duration-300"
            onClick={onClose}
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-300/40 animate-seatPulse">
            <CheckCircleIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-gray-500 text-sm">
            {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"} booked for{" "}
            <span className="font-semibold text-purple-600">{event.name}</span>
          </p>
          {totalPrice > 0 && (
            <p className="mt-2 text-lg font-bold text-gray-900">
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </p>
          )}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
            <p className="text-xs font-semibold text-amber-700">
              ⏳ Please complete payment from the{" "}
              <span className="text-amber-900 font-bold">My Bookings</span>{" "}
              section within 10 minutes, or your booking will be cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 animate-fadeIn">
      {limitToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10001] animate-slideDown">
          <div className="bg-amber-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-amber-300/40 flex items-center gap-2">
            <TicketIcon className="w-4 h-4" />
            You can only book {maxBookable} tickets at a time
          </div>
        </div>
      )}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onBack}
      />
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl animate-slideInRight z-50 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-purple-700 via-violet-600 to-purple-800 px-6 py-5 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-1">
                Select Your Seats
              </p>
              <h3 className="text-lg font-bold leading-snug truncate pr-8">
                {event.name}
              </h3>
            </div>
            <button
              className="bg-white/15 backdrop-blur-sm hover:bg-white/25 rounded-full p-2 transition-all duration-300"
              onClick={onBack}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {hasArrangement ? (
            <>
              <div className="relative mb-8">
                <div className="w-[70%] mx-auto h-8 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 rounded-b-[80%] flex items-center justify-center shadow-inner">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-600">
                    Stage
                  </span>
                </div>
                <div className="w-[80%] mx-auto h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mt-2" />
              </div>
              <div className="flex flex-col items-center gap-1.5 mb-6">
                {seatMap.map((row, ri) => (
                  <div key={ri} className="flex items-center gap-1">
                    <span className="w-6 text-[10px] font-bold text-gray-400 text-right mr-1">
                      {row[0]?.row}
                    </span>
                    {row.map((seat, si) => {
                      const sel = isSelected(seat);
                      const state = sel ? "selected" : seat.status;
                      return (
                        <button
                          key={si}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg rounded-b-sm text-[9px] font-bold transition-all duration-200 ${seatStyles[state]}`}
                          onClick={() => toggleSeat(seat)}
                          disabled={
                            seat.status === "booked" || seat.status === "gap"
                          }
                          title={
                            seat.status === "gap"
                              ? ""
                              : `${seat.row}${seat.col}`
                          }
                        >
                          {state !== "gap" && seat.col}
                        </button>
                      );
                    })}
                    <span className="w-6 text-[10px] font-bold text-gray-400 text-left ml-1">
                      {row[0]?.row}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-5 mb-6">
                {[
                  { label: "Available", cls: "bg-gray-200 border-gray-300" },
                  {
                    label: "Selected",
                    cls: "bg-gradient-to-br from-purple-500 to-violet-600 border-purple-400",
                  },
                  { label: "Booked", cls: "bg-gray-700 border-gray-600 opacity-60" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span
                      className={`w-5 h-5 rounded-t-md rounded-b-sm border ${item.cls}`}
                    />
                    <span className="text-[11px] text-gray-500 font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-violet-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <TicketIcon className="w-12 h-12 text-purple-500" />
              </div>
              <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
                This event has open seating. Choose how many tickets you'd
                like.
              </p>

              <div className="flex items-center gap-5">
                <button
                  className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="w-5 h-5 text-gray-600" />
                </button>

                <span className="text-4xl font-extrabold text-gray-900 w-16 text-center tabular-nums">
                  {quantity}
                </span>

                <button
                  className="w-12 h-12 rounded-xl bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (quantity >= maxBookable) {
                      flashLimitToast();
                      return;
                    }
                    setQuantity((q) => Math.min(maxBookable, q + 1));
                  }}
                  disabled={quantity >= maxBookable}
                >
                  <PlusIcon className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Max {maxBookable} tickets per booking
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-gray-100 bg-gray-50/80 backdrop-blur px-6 py-4 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400 font-medium">
                {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"}{" "}
                selected
                {hasArrangement && selected.length > 0 && (
                  <span className="text-purple-500 ml-1">
                    ({selected.join(", ")})
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              {event.isPaid ? (
                <p className="text-xl font-extrabold text-gray-900">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </p>
              ) : (
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Free
                </span>
              )}
            </div>
          </div>

          <button
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] ${
              ticketCount === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-violet-500 text-white hover:from-purple-700 hover:to-violet-600 shadow-lg shadow-purple-300/40 hover:shadow-purple-400/50"
            }`}
            disabled={ticketCount === 0}
            onClick={handleConfirm}
          >
            <span className="flex items-center justify-center gap-2">
              <TicketIcon className="w-4 h-4" />
              {ticketCount === 0 ? "Select Seats to Continue" : "Confirm Booking"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
