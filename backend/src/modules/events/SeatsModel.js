import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    row: {
      type: String,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },

    seatCode: {
      type: String,
      required: true,
    },

    tier: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"],
      default: "AVAILABLE",
    },

    reservedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reservationExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

seatSchema.index({ eventId: 1, seatCode: 1 }, { unique: true });

export const Seat = mongoose.model("seats", seatSchema);
