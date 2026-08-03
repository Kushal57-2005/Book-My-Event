import api from "./axiosInstance";

export const getEventsApi = async (params = {}) => {
  try {
    const res = await api.get("/events", { params });
    const rawData = res.data?.data ?? res.data;
    if (Array.isArray(rawData)) {
      return rawData.map((e) => ({
        ...e,
        id: e.id || e._id,
        _id: e._id || e.id,
      }));
    }
  } catch (error) {
    console.warn("Backend /events API unavailable, falling back to local json:", error);
  }

  // Fallback to static JSON if API fails
  try {
    const fallbackRes = await fetch("/data/events.json");
    if (!fallbackRes.ok) throw new Error("Fallback fetch failed");
    let fallbackData = await fallbackRes.json();

    if (params.type) {
      fallbackData = fallbackData.filter((e) => e.type === params.type);
    }
    if (params.search) {
      const words = params.search.toLowerCase().trim().split(/\s+/).filter(Boolean);
      if (words.length > 0) {
        fallbackData = fallbackData.filter((e) => {
          const name = (e.name || "").toLowerCase();
          return words.every((w) => name.includes(w));
        });
      }
    }

    return fallbackData.map((e) => ({
      ...e,
      id: e.id || e._id,
      _id: e._id || e.id,
    }));
  } catch (fallbackErr) {
    console.error("Failed to load events data:", fallbackErr);
    return [];
  }
};

export const getEventSeatsApi = async (eventId) => {
  try {
    const res = await api.get(`/events/${eventId}/seats`);
    return res.data?.data || res.data || [];
  } catch (error) {
    console.warn("Failed to fetch seats from API, falling back:", error);
    return [];
  }
};

export const createEventApi = async (eventData) => {
  const res = await api.post("/events/create", eventData);
  return res.data?.data || res.data;
};
