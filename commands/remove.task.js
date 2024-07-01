import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import * as db from "../core/db/index.js";

function isValidObjectId(id) {
  // Check if the string is a 24-character hexadecimal string
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
}

export async function getTaskId() {
  try {
    let userInput;
    let isValidInput = false;
    do {
      userInput = await inquirer.prompt([
        {
          name: "taskId",
          message: "Please enter taskId",
          type: "input",
        },
      ]);
      if (userInput.taskId && isValidObjectId(userInput.taskId)) {
        isValidInput = true;
      } else {
        console.log(
          chalk.redBright("Invalid TaskId. Please provide a valid taskId")
        );
      }
    } while (!isValidInput);

    userInput.taskId = userInput.taskId.trim();

    return userInput;
  } catch (err) {
    console.log("Something went wrong. Please try again.\n", err);
  }
}

export default async function removeTaskById() {
  try {
    const userInput = await getTaskId();

    const spinner = ora("Removing the task from db if it exists").start();

    const response = await db.deleteById(userInput.taskId);

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
