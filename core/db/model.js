import mongoose from "mongoose";
import { TASK_STATUS_CREATED, TASK_STATUS_DONE } from "../constants";

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
      enum: [TASK_STATUS_CREATED, TASK_STATUS_DONE],
      default: TASK_STATUS_CREATED,
      trim: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("tasks", TaskSchema);
export default TaskModel;
