import ora from "ora";
import chalk from "chalk";

import * as db from "../core/db/index.js";

function displayTask({ _id, taskName, taskDescription, status }) {
  console.log(
    `${chalk.cyanBright("Task Id: ")}${_id}\n` +
      `${chalk.blueBright("Task Name: ")}${taskName}\n` +
      `${chalk.yellowBright("Task Description: ")}${taskDescription}\n` +
      `${chalk.greenBright("Task Status: ")}${status}\n`
  );
}

export default async function listTasks() {
  try {
    const spinner = ora("Fetching tasks...").start();
    const tasks = await db.findAll({});
    spinner.stop();

    if (!tasks?.length) {
      console.log(chalk.blueBright("No tasks exists!"));
    }

    tasks.forEach((task) => {
      displayTask(task);
    });
  } catch (error) {
    console.log("Something went wrong. ", error);
    process.exit(1);
  }
}
