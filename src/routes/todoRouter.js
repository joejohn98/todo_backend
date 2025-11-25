import express from "express";

const router = express.Router();

router.get("/all", allTodos);

router.post("/create", addTodo);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

export default router;
