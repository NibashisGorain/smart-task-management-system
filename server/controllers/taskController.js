const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Create task
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,

      // Logged-in user id from middleware
      user: req.user,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    // Find tasks of logged-in user
    const tasks = await Task.find({ user: req.user });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    // Find task by id
    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    // Find task
    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Delete task
    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};