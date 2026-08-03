import Router from "express";
import { createEvent, getEvents, getSeatsByEvent } from "./controller.js";
import authProvider from "../../middleware/middleware.js";
import isAdmin from "../../middleware/isAdmin.js";

const router = Router();

router.get("/", getEvents);
router.post("/create", authProvider, isAdmin, createEvent);
router.get("/:eventId/seats", getSeatsByEvent);

export default router;
