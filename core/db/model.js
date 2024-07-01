import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    taskDescription: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["done", "created"],
      default: "created",
      trim: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("tasks", TaskSchema);
export default TaskModel;
