import api from "./axiosInstance.js";

/**
 * Fetch the current user's watchlisted event IDs.
 * @returns {Promise<AxiosResponse>} api response containing the array of event IDs.
 */
export const fetchWatchlist = () => api.get("/user/watchlist");

/**
 * Toggle the watchlist status for a specific event.
 * @param {number} eventId - The ID of the event to add or remove.
 * @returns {Promise<AxiosResponse>} api response containing the updated watchlist array.
 */
export const toggleWatchlistAPI = (eventId) =>
  api.post("/user/watchlist/toggle", { eventId });
