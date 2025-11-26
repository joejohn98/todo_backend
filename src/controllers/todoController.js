import mongoose from "mongoose";
import Todo from "../models/todoModel.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log("Error fetching todos", error);
    res.status(500).json({ status: "error", message: "failed to fetch todos" });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      status: "fail",
      message: "Title and Description are required",
    });
  }

  try {
    const todo = await Todo.create({
      title,
      description,
    });
    res.status(201).json({
      status: "success",
      message: "Todo Added Successfully !",
      todo,
    });
  } catch (error) {
    console.log("Error creating todo", error);
    res.status(500).json({
      status: "error",
      message: "failed to create todo",
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Todo ID is required",
    });
  }
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Todo ID format",
    });
  }

  if (isCompleted === undefined) {
    return res.status(400).json({
      status: "fail",
      message: "isCompleted field is required",
    });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({
        status: "fail",
        message: "Todo not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.log("Error updating todo", error);
    res.status(500).json({
      status: "error",
      message: "failed to update todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Todo ID is required",
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Todo ID format",
    });
  }

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({
        status: "fail",
        message: "Todo not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting todo", error);
    res.status(500).json({
      status: "error",
      message: "failed to delete todo",
    });
  }
};

export { allTodos, createTodo, updateTodo, deleteTodo };
