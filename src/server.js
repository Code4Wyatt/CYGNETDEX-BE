import dotenv from "dotenv";
import express from "express"
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import moralisRouter from "./routes/moralis/index.js"

import { unauthorizedHandler, forbiddenHandler, catchAllHandler } from "./errorHandlers.js"
import Moralis from 'moralis';
dotenv.config();
const server = express()

const port = process.env.PORT || 3001;

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  server.listen(port, () => {
    console.log(`Listening for API Calls on port: ${port}`);
  });
});

// Middlewares

const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions))
server.use(express.json())
server.use(bodyParser.json())



server.use(cors())

// Routes

server.use("/moralis", moralisRouter)

// Error Handlers

server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

// Database Connection

// mongoose.connect(process.env.MONGO_CONNECTION)

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected!")
//   server.listen(port, () => {
//     console.table(listEndpoints(server))
//     console.log(`Server is running on port ${port}`)
//   })
// })

console.table(listEndpoints(server))

export default server