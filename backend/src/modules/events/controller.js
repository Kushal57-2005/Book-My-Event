import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  createEventService,
  getAllEventsService,
  getSeatsByEventService,
} from "./service.js";

export const getEvents = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.type) {
    filter.type = req.query.type;
  }

  if (req.query.search) {
    const searchTerms = req.query.search.trim().split(/\s+/).filter(Boolean);
    if (searchTerms.length > 0) {
      filter.$and = searchTerms.map((term) => ({
        name: { $regex: term, $options: "i" },
      }));
    }
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;
  const result = await getAllEventsService(limit, skip, filter);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Events Fetched Successfully"));
});

export const createEvent = asyncHandler(async (req, res) => {
  const event = await createEventService(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});

export const getSeatsByEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const seats = await getSeatsByEventService(eventId);

  return res
    .status(200)
    .json(new ApiResponse(200, seats, "Seats fetched successfully"));
});
