import TaskModel from "./model.js";
import { Types } from "mongoose";

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

export const deleteById = async (taskId) => {
  return await TaskModel.deleteOne({
    _id: Types.ObjectId.createFromHexString(taskId),
  });
};
