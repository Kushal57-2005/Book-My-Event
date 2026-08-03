import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    img: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    daysFromNow: {
      type: Number,
      required: true,
      min: 0,
    },

    seatArrengement: {
      type: Boolean,
      default: false,
    },

    info: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["education", "music", "entertainment", "cultural", "spiritual"],
    },

    seatCount: {
      type: Number,
      required: true,
      min: 0,
    },

    seatAvailable: {
      type: Number,
      required: true,
      min: 0,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Event = mongoose.model("Event", eventSchema);
