import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import * as config from "../core/config/index.js";
import * as db from "../core/db/index.js";

const { taskMsgs, exceptionMsgs } = config.messages();

async function requestUserInput() {
  const answers = await inquirer.prompt([
    { name: "taskName", message: taskMsgs.name, type: "input" },
    {
      name: "taskDescription",
      message: taskMsgs.description,
      type: "input",
    },
  ]);

  return answers;
}

const takeUserInput = async () => {
  const tasks = [];
  let addAnotherTask = false;
  do {
    const userInput = await requestUserInput();
    tasks.push(userInput);
    const confirmQ = await inquirer.prompt([
      {
        name: "confirm",
        message: taskMsgs.confirmation,
        type: "confirm",
      },
    ]);

    if (confirmQ.confirm) {
      addAnotherTask = true;
    } else {
      addAnotherTask = false;
    }
  } while (addAnotherTask);

  return tasks;
};

export default async function createTask() {
  try {
    const userResponse = await takeUserInput();
    let spinner = ora(taskMsgs.processing).start();
    // save the tasks
    const response = await db.saveAll(userResponse);
    spinner.stop();
    console.log(chalk.greenBright(taskMsgs.saved));
  } catch (error) {
    console.log(exceptionMsgs.internal, error);
    process.exit(1);
  }
}
