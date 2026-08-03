import { reserveBookingService } from "./service";

export const reserveBooking = asyncHandler(async (req, res) => {
    const {eventId, seatIds} = req.body;
    const userId = req.user._id;

    const result = await reserveBookingService(userId,eventId,seatIds)

    
});
    