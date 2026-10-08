const express = require("express");
const cors = require("cors");
const messagesRouter = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Chat API is running. Use /api/v1/messages",
  });
});

app.use("/api/v1/messages", messagesRouter);

// Catch-all 404 in JSend format
app.use((req, res) => {
  res.status(404).json({ status: "fail", message: "Route not found", data: null });
});

// Error handler (e.g. invalid JSON body)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ status: "error", message: err.message });
});

module.exports = app;
