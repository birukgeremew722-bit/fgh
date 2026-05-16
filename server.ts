import express from "express";
import path from "path";
import cors from "cors";
import Database from "better-sqlite3";
import { createServer as createViteServer } from "vite";

const db = new Database("aladdin_bookings.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    seating TEXT NOT NULL,
    specialRequests TEXT,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/reservations", (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM reservations ORDER BY createdAt DESC");
      const reservations = stmt.all();
      res.json(reservations);
    } catch (error) {
      console.error("SQL Error:", error);
      res.status(500).json({ error: "Failed to fetch reservations" });
    }
  });

  app.post("/api/reservations", (req, res) => {
    try {
      const { fullName, email, phone, date, time, guests, seating, specialRequests, status } = req.body;
      const id = Math.random().toString(36).substring(2, 11);
      const createdAt = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO reservations (id, fullName, email, phone, date, time, guests, seating, specialRequests, status, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        id,
        fullName,
        email,
        phone,
        date,
        time,
        guests,
        seating,
        specialRequests || "",
        status || "pending",
        createdAt
      );

      res.status(201).json({ id, fullName, email, phone, date, time, guests, seating, specialRequests, status, createdAt });
    } catch (error) {
      console.error("SQL Error:", error);
      res.status(500).json({ error: "Failed to create reservation" });
    }
  });

  app.patch("/api/reservations/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const stmt = db.prepare("UPDATE reservations SET status = ? WHERE id = ?");
      const result = stmt.run(status, id);

      if (result.changes > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    } catch (error) {
      console.error("SQL Error:", error);
      res.status(500).json({ error: "Failed to update reservation" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
