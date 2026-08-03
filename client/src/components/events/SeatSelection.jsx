import { useState, useMemo, useEffect } from "react";
import {
  XMarkIcon,
  TicketIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { getEventSeatsApi } from "../../api/events";

function generateSeatMap(seatCount, seatAvailable) {
  const COLS = 12;
  const rows = Math.ceil(seatCount / COLS);
  const totalSeats = rows * COLS;
  const bookedCount = seatCount - seatAvailable;

  const flat = Array.from({ length: totalSeats }, (_, i) => ({
    id: i,
    row: String.fromCharCode(65 + Math.floor(i / COLS)),
    col: (i % COLS) + 1,
    status: i < seatCount ? "available" : "gap",
  }));

  const availableIndices = flat
    .map((s, i) => (s.status === "available" ? i : null))
    .filter((i) => i !== null);
  const shuffled = [...availableIndices].sort(() => Math.random() - 0.5);
  shuffled.slice(0, bookedCount).forEach((i) => {
    flat[i].status = "booked";
  });

  const rowMap = [];
  for (let r = 0; r < rows; r++) {
    rowMap.push(flat.slice(r * COLS, r * COLS + COLS));
  }
  return rowMap;
}

const TIER_THEMES = [
  {
    name: "VIP",
    seatStyle:
      "bg-purple-100 hover:bg-purple-200 border-purple-400 text-purple-950 font-bold",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
    dot: "bg-purple-600",
  },
  {
    name: "EXECUTIVE",
    seatStyle:
      "bg-indigo-100 hover:bg-indigo-200 border-indigo-400 text-indigo-950 font-bold",
    badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-300",
    dot: "bg-indigo-600",
  },
  {
    name: "PREMIUM",
    seatStyle:
      "bg-sky-100 hover:bg-sky-200 border-sky-400 text-sky-950 font-bold",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-300",
    dot: "bg-sky-600",
  },
  {
    name: "GENERAL",
    seatStyle:
      "bg-emerald-100 hover:bg-emerald-200 border-emerald-400 text-emerald-950 font-bold",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    dot: "bg-emerald-600",
  },
  {
    name: "STANDARD",
    seatStyle:
      "bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 font-bold",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
    dot: "bg-amber-500",
  },
];

function getTierTheme(tierName, index = 0) {
  const upper = (tierName || "").toUpperCase();
  const match = TIER_THEMES.find((t) => upper.includes(t.name));
  if (match) return match;
  return TIER_THEMES[index % TIER_THEMES.length];
}

const MAX_TICKETS = 10;

export default function SeatSelection({ event, onClose, onBack }) {
  const [selected, setSelected] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [limitToast, setLimitToast] = useState(false);
  const [apiSeats, setApiSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(true);

  const seatsAvailable = Number(event.seatAvailable ?? 0);
  const hasArrangement = event.seatArrengement === true;
  const eventId = event.id || event._id;

  useEffect(() => {
    let isMounted = true;
    if (hasArrangement && eventId) {
      setLoadingSeats(true);
      getEventSeatsApi(eventId)
        .then((seats) => {
          if (isMounted) setApiSeats(seats || []);
        })
        .finally(() => {
          if (isMounted) setLoadingSeats(false);
        });
    } else {
      setLoadingSeats(false);
    }
    return () => {
      isMounted = false;
    };
  }, [eventId, hasArrangement]);

  const { rowsList, tierSummary } = useMemo(() => {
    if (apiSeats && apiSeats.length > 0) {
      const tierMap = {};
      const rowMap = {};
      let tierIndexCounter = 0;

      apiSeats.forEach((seat) => {
        const tierName = seat.tier || "Standard";
        if (!tierMap[tierName]) {
          const theme = getTierTheme(tierName, tierIndexCounter++);
          tierMap[tierName] = {
            name: tierName,
            price: seat.price ?? event.price ?? 0,
            theme,
          };
        }

        const r = seat.row;
        if (!rowMap[r]) {
          rowMap[r] = {
            rowName: r,
            tierName,
            theme: tierMap[tierName].theme,
            price: tierMap[tierName].price,
            seats: [],
          };
        }

        rowMap[r].seats.push({
          ...seat,
          col: seat.number,
          seatCode: seat.seatCode || `${seat.row}${seat.number}`,
          status:
            seat.status === "AVAILABLE" || seat.status === "available"
              ? "available"
              : "booked",
        });
      });

      return {
        rowsList: Object.values(rowMap),
        tierSummary: Object.values(tierMap),
      };
    }

    if (!hasArrangement) return { rowsList: [], tierSummary: [] };

    const fallbackRows = generateSeatMap(event.seatCount, seatsAvailable);
    const theme = getTierTheme("General", 0);
    const fallbackList = fallbackRows.map((row) => ({
      rowName: row[0]?.row || "A",
      tierName: "General",
      theme,
      price: event.price || 0,
      seats: row.map((s) => ({
        ...s,
        seatCode: `${s.row}${s.col}`,
        price: event.price || 0,
      })),
    }));

    return {
      rowsList: fallbackList,
      tierSummary: [
        {
          name: "General",
          price: event.price || 0,
          theme,
        },
      ],
    };
  }, [apiSeats, hasArrangement, event.seatCount, seatsAvailable, event.price]);

  const maxBookable = Math.min(MAX_TICKETS, seatsAvailable);

  const flashLimitToast = () => {
    setLimitToast(true);
    setTimeout(() => setLimitToast(false), 2500);
  };

  const toggleSeat = (seat) => {
    const status = seat.status?.toLowerCase();
    if (status !== "available") return;
    const code = seat.seatCode || `${seat.row}${seat.col}`;

    setSelected((prev) => {
      const exists = prev.some((s) => s.seatCode === code);
      if (exists) return prev.filter((s) => s.seatCode !== code);
      if (prev.length >= maxBookable) {
        flashLimitToast();
        return prev;
      }
      return [
        ...prev,
        {
          seatCode: code,
          price: seat.price ?? event.price ?? 0,
          tier: seat.tier || "General",
        },
      ];
    });
  };

  const isSelected = (seat) => {
    const code = seat.seatCode || `${seat.row}${seat.col}`;
    return selected.some((s) => s.seatCode === code);
  };

  const ticketCount = hasArrangement ? selected.length : quantity;
  const totalPrice = event.isPaid
    ? hasArrangement
      ? selected.reduce((sum, s) => sum + (s.price || 0), 0)
      : quantity * (event.price || 0)
    : 0;

  const handleConfirm = () => {
    const booking = {
      eventId: event.id || event._id,
      eventName: event.name,
      location: event.location,
      seats: hasArrangement ? selected.map((s) => s.seatCode) : [],
      ticketCount,
      totalPrice,
      bookedAt: new Date().toISOString(),
      bookingId: `BME-${Date.now().toString(36).toUpperCase()}`,
    };

    const existing = JSON.parse(localStorage.getItem("bme_bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bme_bookings", JSON.stringify(existing));

    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 animate-fadeIn">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full animate-scaleIn z-50 border border-stone-200">
          <button
            className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 rounded-full p-1.5 transition-all duration-300"
            onClick={onClose}
          >
            <XMarkIcon className="w-5 h-5 text-stone-500" />
          </button>

          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 animate-seatPulse">
            <CheckCircleIcon className="w-9 h-9" />
          </div>

          <h3 className="text-2xl font-black text-stone-900 mb-1">
            Pass Reserved!
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm">
            {ticketCount} {ticketCount === 1 ? "pass" : "passes"} reserved for{" "}
            <span className="font-bold text-stone-900">{event.name}</span>
          </p>

          {totalPrice > 0 && (
            <p className="mt-3 text-xl font-extrabold text-stone-900">
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </p>
          )}

          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-left">
            <p className="text-xs font-semibold text-amber-800 leading-relaxed">
              Please finalize payment from the{" "}
              <span className="font-extrabold text-stone-900">
                My Bookings
              </span>{" "}
              section within 10 minutes to lock your reservation.
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
          <div className="bg-amber-400 text-stone-950 text-xs font-bold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-amber-300">
            <TicketIcon className="w-4 h-4" />
            Maximum limit is {maxBookable} passes per order
          </div>
        </div>
      )}

      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onBack}
      />

      <div className="relative bg-white w-full max-w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] rounded-2xl shadow-2xl animate-slideInRight z-50 overflow-hidden flex flex-col border border-stone-200">
        {/* Header */}
        <div className="bg-stone-900 px-6 py-5 text-white shrink-0 flex items-center justify-between border-b border-stone-800">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 mb-0.5">
              Seat Map & Tier Selection
            </p>
            <h3 className="text-base font-bold leading-snug truncate max-w-md">
              {event.name}
            </h3>
          </div>
          <button
            className="bg-stone-800 hover:bg-stone-700 rounded-full p-2 text-stone-300 transition-all duration-300"
            onClick={onBack}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50/50">
          {hasArrangement ? (
            <>
              {/* Stage indicator */}
              <div className="relative mb-6">
                <div className="w-[70%] mx-auto h-7 bg-stone-800 rounded-b-[80%] flex items-center justify-center shadow-md">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-amber-400">
                    STAGE
                  </span>
                </div>
              </div>

              {/* Tiers Legend Bar */}
              {tierSummary.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-4 mb-6 bg-white border border-stone-200 rounded-xl px-4 py-2.5 shadow-sm">
                  {tierSummary.map((t) => (
                    <div key={t.name} className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${t.theme.dot}`} />
                      <span className="text-xs font-bold text-stone-800">
                        {t.name}
                      </span>
                      <span className="text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ₹{t.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {loadingSeats ? (
                <div className="flex flex-col items-center justify-center py-12 text-stone-500">
                  <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-xs font-semibold">Loading Seat Map...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2.5 mb-6 overflow-x-auto w-full py-2">
                  {rowsList.map((rowObj) => (
                    <div
                      key={rowObj.rowName}
                      className="flex items-center gap-1.5"
                    >
                      <span className="w-6 text-[11px] font-bold text-stone-500 text-right mr-1">
                        {rowObj.rowName}
                      </span>
                      {rowObj.seats.map((seat, si) => {
                        const sel = isSelected(seat);
                        const isBooked = seat.status === "booked";
                        let seatCls = rowObj.theme.seatStyle;
                        if (sel) {
                          seatCls =
                            "bg-amber-400 text-stone-950 shadow-md scale-110 cursor-pointer border border-amber-300 font-extrabold animate-seatPulse";
                        } else if (isBooked) {
                          seatCls =
                            "bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700 opacity-60";
                        }

                        return (
                          <button
                            key={si}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-t-lg rounded-b-sm text-[8px] sm:text-[9px] font-extrabold transition-all duration-200 border ${seatCls}`}
                            onClick={() => toggleSeat(seat)}
                            disabled={isBooked}
                            title={`${rowObj.tierName} - Row ${seat.row} Seat ${seat.col} (₹${seat.price})`}
                          >
                            {seat.col}
                          </button>
                        );
                      })}
                      <span className="w-6 text-[11px] font-bold text-stone-500 text-left ml-1">
                        {rowObj.rowName}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* General Status Legend */}
              <div className="flex items-center justify-center gap-5 mb-4">
                {[
                  {
                    label: "Selected",
                    cls: "bg-amber-400 border-amber-300",
                  },
                  {
                    label: "Booked",
                    cls: "bg-stone-800 border-stone-700 opacity-60",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span className={`w-4 h-4 rounded-md border ${item.cls}`} />
                    <span className="text-[11px] text-stone-600 font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-8">
              <div className="w-20 h-20 bg-stone-900 rounded-2xl flex items-center justify-center mb-5 text-amber-400 border border-stone-800 shadow-md">
                <TicketIcon className="w-10 h-10" />
              </div>
              <p className="text-stone-600 text-xs sm:text-sm mb-6 text-center max-w-xs leading-relaxed">
                Open Floor Admission. Select the number of passes required.
              </p>

              <div className="flex items-center gap-5">
                <button
                  className="w-11 h-11 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="w-4 h-4 text-stone-700" />
                </button>

                <span className="text-3xl font-black text-stone-900 w-14 text-center tabular-nums">
                  {quantity}
                </span>

                <button
                  className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 text-amber-400 hover:bg-stone-800 flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
                  onClick={() => {
                    if (quantity >= maxBookable) {
                      flashLimitToast();
                      return;
                    }
                    setQuantity((q) => Math.min(maxBookable, q + 1));
                  }}
                  disabled={quantity >= maxBookable}
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-stone-400 mt-3 font-medium">
                Maximum {maxBookable} passes per order
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 bg-white px-6 py-4 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-stone-500 font-medium">
                {ticketCount} {ticketCount === 1 ? "pass" : "passes"} selected
                {hasArrangement && selected.length > 0 && (
                  <span className="text-stone-900 font-bold ml-1">
                    ({selected.map((s) => s.seatCode).join(", ")})
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              {event.isPaid ? (
                <p className="text-xl font-black text-stone-900">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </p>
              ) : (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Free Access
                </span>
              )}
            </div>
          </div>

          <button
            className={`w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 active:scale-[0.97] ${
              ticketCount === 0
                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                : "bg-stone-900 text-amber-300 border border-stone-800 hover:bg-stone-800 shadow-md"
            }`}
            disabled={ticketCount === 0}
            onClick={handleConfirm}
          >
            <span className="flex items-center justify-center gap-2">
              <TicketIcon className="w-4 h-4" />
              {ticketCount === 0
                ? "Select Seats to Proceed"
                : "Confirm Pass Selection"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
