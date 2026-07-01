import app from "./app";
import { env } from "../config/env"; 
import { connectDatabase } from "../config/database";


async function startApplication() {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
    console.log(`
      SmartConnect Started
      Server running on ${env.port}
      `);
    });
  } catch (error) {
    console.error("Failed to start application", error);
    process.exit(1);
  }
  
}

startApplication();