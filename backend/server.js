import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/livestream");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
connectDB();

// Connect to MongoDB

// Overlay Schema
const overlaySchema = new mongoose.Schema({
  text: String,
  image: String,
  position: { x: Number, y: Number },
  size: { width: Number, height: Number },
});

const Overlay = mongoose.model("Overlay", overlaySchema);

// CRUD Routes
app.post("/api/overlays", async (req, res) => {
  try {
    const overlay = new Overlay(req.body);
    await overlay.save();
    res.status(201).send(overlay); // 201 Created
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/overlays", async (req, res) => {
  try {
    const overlays = await Overlay.find();
    res.send(overlays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/overlays/:id", async (req, res) => {
  try {
    const overlay = await Overlay.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!overlay) return res.status(404).json({ message: "Overlay not found" });
    res.send(overlay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/overlays/:id", async (req, res) => {
  try {
    const overlay = await Overlay.findByIdAndDelete(req.params.id);
    if (!overlay) return res.status(404).json({ message: "Overlay not found" });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
