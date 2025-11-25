import Todo from "../models/todoModel.js";

const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: "fail",
      results: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log("Error fetching todos", error);
    res.status(500).json({ status: "error", message: "failed to fetch todos" });
  }
};

export { allTodos };
