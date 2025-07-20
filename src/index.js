
require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const mongoose   = require("mongoose");
const serverless = require("serverless-http");

const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.get("/", (_req, res) => res.send("Notes API"));

// Ensure we connect only once
let dbPromise;
async function connectDB() {
  if (!dbPromise) {
    dbPromise = mongoose.connect(process.env.MONGO_URL);
  }
  return dbPromise;
}

// Local‑only listener (so `npm start` / `node index.js` still works)
if (process.env.NODE_ENV !== "production" && require.main === module) {
  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () =>
        console.log(`🚀 Local server listening on http://localhost:${PORT}`)
      );
    })
    .catch(console.error);
}

// The actual Serverless Function entrypoint
module.exports = async (req, res) => {
  await connectDB();
  return serverless(app)(req, res);
};
