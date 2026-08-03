import api from "./axiosInstance.js";

/**
 * Fetch the current user's bookings.
 * @returns {Promise<AxiosResponse>} api response containing user's booking list.
 */
export const fetchBookings = () => api.get("/bookings");

/**
 * Create a new event booking.
 * @param {Object} bookingData - The booking details (eventId, eventName, location, seats, ticketCount, totalPrice, bookedAt, bookingId).
 * @returns {Promise<AxiosResponse>} api response containing the created booking details.
 */
export const createBookingAPI = (bookingData) =>
  api.post("/bookings", bookingData);
