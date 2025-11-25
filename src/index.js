import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
