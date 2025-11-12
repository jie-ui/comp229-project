import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const { PORT = 5000, MONGODB_URI } = process.env;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start", err);
    process.exit(1);
  }
}
start();
