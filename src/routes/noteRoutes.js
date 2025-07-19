const express = require("express")
const noteRouter = express.Router()

noteRouter.get("/", (req, res)=> {
    res.send("Note GET request")
})

noteRouter.post("/", (req, res)=> {
    res.send("Note POST request")
})

module.exports = noteRouter
