import { Types } from "mongoose";
import TaskModel from "./model.js";
import { TASK_STATUS_CREATED, TASK_STATUS_DONE } from "../constants/index.js";

export const saveAll = async (tasks) => {
  return TaskModel.insertMany(tasks);
};

export const findAll = async () => {
  return await TaskModel.find({});
};

export const findById = async (taskId) => {
  return await TaskModel.find({
    _id: Types.ObjectId.createFromHexString(taskId),
  });
};

export const updateTaskById = async (taskId, task) => {
  const updateQuery = {};

  if (
    (task?.status &&
      task.status != "" &&
      task.status === TASK_STATUS_CREATED) ||
    task.status === TASK_STATUS_DONE
  ) {
    updateQuery["status"] = task.status;
  }

  if (task?.taskName && task.taskName != "") {
    updateQuery["taskName"] = task.taskName;
  }

  if (task?.taskDescription && task.taskDescription != "") {
    updateQuery["taskDescription"] = task.taskDescription;
  }

  if (!Object.keys(updateQuery)?.length) {
    return;
  }

  return await TaskModel.updateOne(
    { _id: Types.ObjectId.createFromHexString(taskId) },
    {
      $set: {
        ...updateQuery,
      },
    }
  );
};

export const deleteById = async (taskId) => {
  return await TaskModel.deleteOne({
    _id: Types.ObjectId.createFromHexString(taskId),
  });
};
