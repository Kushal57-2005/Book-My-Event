import { useState } from "react";
import Button from "../common/Button";

export default function EventDetails({ event, onClose }) {
  const [showSeats, setShowSeats] = useState(false);

  if (!event) return null;

  const today = new Date();
  const date = new Date();
  const offset = Number(event.daysFromNow || 0);
  date.setDate(today.getDate() + offset);

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const finalDate = `${datePart} • ${event.time}`;
  const availableSeats = Math.floor(Math.random() * (event.seatCount / 2));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-9999">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-[380px] rounded-lg shadow-lg animate-scaleIn z-50">
        <button
          className="absolute top-3 right-3 hover: text-white rounded-full p-1"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={event.img}
          className="rounded-t-lg w-full h-52 object-cover"
        />

        <div className="p-6 text-center">
          <span className="inline-flex items-center bg-purple-100 text-purple-700 border border-purple-300 text-xs font-medium px-1.5 py-0.5 rounded-sm">
            Trending
          </span>

          <h5 className="mt-3 mb-1 text-2xl font-semibold">{event.name}</h5>
          <p className="text-black mb-1">{event.info}</p>
          <p className="text-gray-600">{event.location}</p>
          <p className="text-gray-800 mt-2">{finalDate}</p>
          {event.isPaid ? (
            <p className="text-green-700 mt-2">₹{event.price}</p>
          ) : (
            <p className="text-green-700 mt-2">Free</p>
          )}

          {/* Seat Availability */}
          {showSeats &&
            (availableSeats > 0 ? (
              <p className="text-green-700 font-semibold mt-2">
                Available Seats: {availableSeats}
              </p>
            ) : (
              <p className="text-red-600 font-semibold mt-2">Seats are full</p>
            ))}

          <div className="flex flex-col justify-center items-center gap-3 mt-3">
            <Button contain="Book" />

            <div className="flex flex-row justify-center items-center gap-3">
              <Button
                contain="Check Availability"
                onClick={() => setShowSeats(!showSeats)}
              />
              <Button contain="Add to Wishlist" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
