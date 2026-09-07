import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import weatherRouter from "./weather.js";

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/weather", weatherRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/info", (req, res) => {
  res.json({
    name: "Weather Service API",
    version: "1.0.0",
    endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"],
  });
});

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/docs", (req, res) => {
  res.redirect("/api/info");
});

app.get("/api/greet/:name", (req, res) => {
  const { name } = req.params;
  res.json({ greeting: `Hello, ${name}!` });
});

app
  .route("/api/data")
  .get((req, res) => {
    res.json({ message: "GET /api/data", data: [] });
  })
  .post((req, res) => {
    res.status(201).json({ message: "POST /api/data", created: true });
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
