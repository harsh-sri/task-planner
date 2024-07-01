import ora from "ora";
import chalk from "chalk";

import * as db from "../core/db/index.js";

export default async function listTasks() {
  try {
    const spinner = ora("Fetching tasks...").start();
    const tasks = await db.findAll({});
    spinner.stop();

    if (!tasks?.length) {
      console.log(chalk.blueBright("No tasks exists!"));
    }

    tasks.forEach((task) => {
      console.log(
        chalk.cyanBright("Task Id: ") +
          task._id +
          "\n" +
          chalk.blueBright("Task Name: ") +
          task.taskName +
          "\n" +
          chalk.yellowBright("Task Description: ") +
          task.taskDescription +
          "\n"
      );
    });
  } catch (error) {
    console.log("Something went wrong. ", error);
    process.exit(1);
  }
}
