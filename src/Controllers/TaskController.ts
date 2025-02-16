import type { Request, Response } from "express"
import TaskModel from "../Models/Task"

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await TaskModel.find().sort({ createdAt: -1 })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error })
  }
}

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = new TaskModel(req.body)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!task) {
      res.status(404).json({ message: "Task not found" })
      return
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error })
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id)

    if (!task) {
      res.status(404).json({ message: "Task not found" })
      return
    }

    res.status(200).json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error })
  }
}

