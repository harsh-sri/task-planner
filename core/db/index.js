import TaskModel from "./model.js";
import { TASK_STATUS_CREATED, TASK_STATUS_DONE } from "../constants/index.js";

export const saveAll = async (tasks) => {
  try {
    return TaskModel.insertMany(tasks);
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const findAll = async () => {
  try {
    return TaskModel.find({});
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findById = async (taskId) => {
  try {
    return TaskModel.findById(taskId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTaskById = async (taskId, task) => {
  const updateQuery = {};

  if ([TASK_STATUS_CREATED, TASK_STATUS_DONE].includes(task?.status)) {
    updateQuery["status"] = task.status;
  }

  if (task?.taskName) {
    updateQuery["taskName"] = task.taskName;
  }

  if (task?.taskDescription) {
    updateQuery["taskDescription"] = task.taskDescription;
  }

  if (Object.keys(updateQuery).length === 0) {
    return;
  }

  try {
    return TaskModel.findByIdAndUpdate(
      taskId,
      { $set: updateQuery },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteById = async (taskId) => {
  try {
    return TaskModel.findByIdAndDelete(taskId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
