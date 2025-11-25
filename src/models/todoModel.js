import mongoose from "mongoose";

const todoSchema = new mongoose.model(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [500, "Description cannot exceed 500 characters"],
    },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
