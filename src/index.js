const express = require("express")
const userRouter = require("./routes/userRoutes")
const noteRouter = require("./routes/noteRoutes")
const mongoose = require('mongoose');
const app = express()

const uri = "mongodb+srv://ddubey11:D_dubey11@cluster0.4lpi075.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json())


app.use("/users", userRouter)
app.use("/notes", noteRouter)

app.get("/", (req, res)=> {
    res.send("Hello")
})


mongoose.connect(uri).then(()=> {

    app.listen(3000, ()=> {
        console.log("Server started on port 3000")
    })
})
.catch((error) => {
    console.log(error)
})
