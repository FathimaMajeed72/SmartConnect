import mongoose from "mongoose";
import { env } from "./env";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.database.mongoUri);

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB.");

    throw error;
  }
}