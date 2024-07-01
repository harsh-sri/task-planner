import mongoose from "mongoose";
import { TASK_STATUS } from "../constants/index.js";

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
      enum: [TASK_STATUS.CREATED, TASK_STATUS.DONE],
      default: TASK_STATUS.CREATED,
      trim: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("tasks", TaskSchema);
export default TaskModel;
