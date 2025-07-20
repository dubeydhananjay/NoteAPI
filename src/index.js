const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
    res.send("Notes API");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        // Only listen locally if not in Vercel environment
        if (process.env.NODE_ENV !== "production") {
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log("Server started on port " + PORT);
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });

// Export the app for Vercel
module.exports = app;