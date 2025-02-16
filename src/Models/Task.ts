import mongoose, { Schema, type Document } from "mongoose"

interface ITask extends Document {
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.model<ITask>("Task", taskSchema)

