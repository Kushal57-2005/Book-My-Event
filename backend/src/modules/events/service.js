import { generateSeats } from "../../utils/generateSeats.js";
import { Event } from "./Eventsmodel.js";
import { Seat } from "./SeatsModel.js";
import { ApiError } from "../../utils/api-error.js";
import mongoose from "mongoose";

export const getAllEventsService = async (limit, skip, filter) => {
  const events = await Event.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return events;
};

export const createEventService = async (eventData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [event] = await Event.create([eventData], { session });

    if (eventData.seatConfig) {
      const seats = generateSeats(event._id, eventData.seatConfig);
      await Seat.insertMany(seats, { session });
    }

    await session.commitTransaction();
    return event;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getSeatsByEventService = async (eventId) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    throw new ApiError(404, "No seats found for this event");
  }
  const seats = await Seat.find({ eventId }).sort({ row: 1, number: 1 });
  if (!seats.length) {
    throw new ApiError(404, "No seats found for this event");
  }

  return seats;
};

