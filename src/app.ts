import express, { type Application } from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()

// CORS configuration for production
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
)

app.use(express.json())
const port: string | number = process.env.PORT || 8000

import { addTask, getTasks, updateTask, deleteTask } from "./Controllers/TaskController"

mongoose.set("strictQuery", false)

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MongoDB URI is missing")
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB Connected Successfully!")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

// Connect to MongoDB then start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error("Failed to start server:", err)
  })

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" })
})

// API routes
app.get("/tasks", getTasks)
app.post("/tasks", addTask)
app.put("/tasks/:id", updateTask)
app.delete("/tasks/:id", deleteTask)

export default app

