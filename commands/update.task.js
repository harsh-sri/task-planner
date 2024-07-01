import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import * as db from "../core/db/index.js";
import { getTaskId } from "./common/index.js";

async function findUpdateChoice(task) {
  try {
    const updateChoice = await inquirer.prompt([
      {
        name: "taskName",
        message: "Update the task name?",
        type: "input",
        default: task.taskName,
      },
      {
        name: "taskDescription",
        message: "Update the task description?",
        type: "input",
        default: task.taskDescription,
      },
      {
        name: "status",
        message: "Update the status",
        type: "list",
        choices: ["done", "created"],
        default: task.status,
      },
    ]);

    return updateChoice;
  } catch (error) {
    console.log("Something went wrong. Please try again \n", error);
  }
}

export default async function updateTask() {
  try {
    const taskId = await getTaskId();

    const spinner = ora(`Fetching the task with taskId: ${taskId}`).start();

    const task = await db.findById(taskId);

    spinner.stop();

    if (!task) {
      console.log(
        chalk.redBright(`the task with taskId: ${taskId} does not exist`)
      );
    } else {
      console.log(
        chalk.blueBright(
          "Provide the updated data. Press Enter if you don't want to update the data."
        )
      );
      const updateChoice = await findUpdateChoice(task);

      await db.updateTaskById(taskId, updateChoice);
      console.log(chalk.greenBright("Updated the task."));
    }
  } catch (err) {
    console.log("Something went wrong. Please try again. ", err);
    process.exit(1);
  }
}
