import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import * as db from "../core/db/index.js";
import { getTaskId } from "./utils/index.js";
import { TASK_STATUS } from "../core/constants/index.js";

async function findUpdateChoice(task) {
  try {
    return await inquirer.prompt([
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
        choices: [TASK_STATUS.CREATED, TASK_STATUS.DONE],
        default: task.status,
      },
    ]);
  } catch (err) {
    console.error(
      chalk.red("An error occurred during the update process."),
      err
    );
    throw err;
  }
}

async function logTaskNotFound(taskId) {
  console.log(
    chalk.redBright(`The task with taskId: ${taskId} does not exist.`)
  );
}

async function logUpdateInstructions() {
  console.log(
    chalk.blueBright(
      "Provide the updated data. Press Enter if you don't want to update the data."
    )
  );
}

export default async function updateTask() {
  const taskId = await getTaskId();
  const spinner = ora(`Fetching the task with taskId: ${taskId}`).start();

  try {
    const task = await db.findById(taskId);
    spinner.stop();

    if (!task) {
      await logTaskNotFound(taskId);
      return;
    }

    await logUpdateInstructions();
    const updateChoice = await findUpdateChoice(task);

    await db.updateTaskById(taskId, updateChoice);
    console.log(chalk.greenBright("Updated the task successfully."));
  } catch (err) {
    spinner.stop();
    console.error(chalk.red("Something went wrong. Please try again."), err);
  }
}
