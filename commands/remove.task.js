import ora from "ora";
import chalk from "chalk";
import * as db from "../core/db/index.js";
import { getTaskId } from "./common/index.js";

export default async function removeTaskById() {
  try {
    const taskId = await getTaskId();

    const spinner = ora("Removing the task from db if it exists").start();

    const response = await db.deleteById(taskId);

    spinner.stop();

    if (response?.deletedCount === 0) {
      console.log(
        chalk.redBright("Task does not exist. Please provide a valid taskId")
      );
    } else {
      console.log(chalk.greenBright("Task removed!"));
    }
  } catch (error) {
    console.log("Something went wrong. Please try again ", error);
    process.exit(1);
  }
}
