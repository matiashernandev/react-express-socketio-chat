import express from "express"
import http from "http"

import { Server as SocketServer } from "socket.io"
import { resolve } from "path"
import { PORT } from "./config.js"
import morgan from "morgan"

const app = express()
const server = http.createServer(app)

const io = new SocketServer(server, {
  /*  cors: {
    origin: "http://localhost:5173",
  }, */
})

app.use(morgan("dev"))
app.use(express.static(resolve("frontend/dist")))

io.on("connection", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(0, 5),
    })
  })
})

server.listen(PORT)

console.log(`server on port ${PORT}`)
