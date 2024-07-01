import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import * as config from "../core/config/index.js";
import * as db from "../core/db/index.js";

const { taskMsgs, exceptionMsgs } = config.messages();

async function requestUserInput() {
  return inquirer.prompt([
    {
      name: "taskName",
      message: taskMsgs.name,
      type: "input",
      validate: (input) =>
        input.trim() ? true : "Please enter a valid task name.",
    },
    {
      name: "taskDescription",
      message: taskMsgs.description,
      type: "input",
      validate: (input) =>
        input.trim() ? true : "Please enter a valid task description.",
    },
  ]);
}

async function confirmAddAnotherTask() {
  try {
    const { confirm } = await inquirer.prompt([
      { name: "confirm", message: taskMsgs.confirmation, type: "confirm" },
    ]);
    return confirm;
  } catch (error) {
    console.error(chalk.red("Error confirming task addition:"), error);
    throw error;
  }
}

async function takeUserInput() {
  const tasks = [];
  let addAnotherTask = true;

  while (addAnotherTask) {
    const userInput = await requestUserInput();
    tasks.push(userInput);
    addAnotherTask = await confirmAddAnotherTask();
  }
  return tasks;
}

export default async function createTask() {
  try {
    const userResponse = await takeUserInput();
    const spinner = ora(taskMsgs.processing).start();

    // Save the tasks to the database
    await db.saveAll(userResponse);

    spinner.stop();
    console.log(chalk.greenBright(taskMsgs.saved));
  } catch (error) {
    // Ensure the spinner is stopped in case of an error
    ora().stop();
    console.error(chalk.redBright(exceptionMsgs.internal), error);
    process.exit(1);
  }
}
