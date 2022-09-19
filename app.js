const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require("dotenv/config")

//Middleware
app.use(bodyParser.json())

//Import routes
const postRoutes = require("./router/posts")

app.use("/posts", postRoutes)

//ROUTES
app.get("/", (req, res) => {
  res.send("sending response")
})

//Connect with DB
mongoose.connect(process.env.DB_CONNECTION, (res) => {
  console.log("DB connected")
})

mongoose.connection.on("error", function (err) {
  // Do something

  console.log("error occured while connecting db", err)
})

// Start listening server
app.listen(3000)
