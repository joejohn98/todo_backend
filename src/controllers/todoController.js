import Todo from "../models/todoModel.js";

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


export { allTodos, createTodo };
