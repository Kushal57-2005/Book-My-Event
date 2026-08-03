import mongoose from "mongoose";
import dotenv from "dotenv";

import { Event } from "../modules/events/model.js";
import events from "./events.json" with { type: "json" };
dotenv.config();

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    await Event.deleteMany();

    await Event.insertMany(events);

    console.log(`✅ ${events.length} Events Seeded Successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
};

seedEvents();
