import express from "express";
import { allTodos, createTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/all", allTodos);

router.post("/create", createTodo);

// router.put("/update/:id", );

// router.delete("/delete/:id", );

export default router;
