import ApiError from "../../../utils/ApiError.js";
import { Seat } from "../events/SeatsModel.js";
import { User } from "../auth/model.js";
import Booking from "./model.js";

export const reserveBookingService = async (userId, eventId, seatIds) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const user = await User.findById(userId);
    if (!user) throw new ApiError("User not found");

    const event = await Event.findById(eventId);
    if (!event) throw new ApiError("Event not found");

    const seats = await Seat.find({ _id: { $in: seatIds }, eventId });
    if (!seats) throw new ApiError("Seats not found");
    if (seats.length !== seatIds.length) {
      throw new ApiError(404, "One or more seats are invalid");
    }

    for (const seat of seats) {
      if (seat.status !== "AVAILABLE") {
        throw new ApiError(400, `Seat ${seat.seatCode} is not available`);
      }
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const updated = await Seat.updateMany(
      {
        _id: { $in: seatIds },
        eventId,
        status: "AVAILABLE",
      },
      {
        $set: {
          status: "RESERVED",
          reservedBy: userId,
          reservationExpiresAt: expiresAt,
        },
      },
      { session },
    );

    if (updated.modifiedCount !== seatIds.length) {
      throw new ApiError(400, "One or more seats are not available");
    }

    const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);

    const [booking] = await Booking.create(
      [
        {
          userId,
          eventId,
          seats: seatIds,
          totalAmount,
          reservationExpiresAt: expiresAt,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    return booking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
