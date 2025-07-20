// index.js
require("dotenv").config();          // ① load env first
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
app.get("/", (_, res) => res.send("Notes API"));

// --- Mongo connect only once ---
let dbPromise;
async function ensureDb() {
  if (!dbPromise) {
    dbPromise = mongoose.connect(process.env.MONGO_URL);
  }
  return dbPromise;
}

// --- Local‑only listener ---
if (process.env.NODE_ENV !== "production") {
  // for `node index.js` or `npm start`
  ensureDb()
    .then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () =>
        console.log(`🚀 Listening locally on http://localhost:${PORT}`)
      );
    })
    .catch(console.error);
}

// --- Export the handler for Vercel ---
const handler = serverless(app);
module.exports = async (req, res) => {
  await ensureDb();
  return handler(req, res);
};
