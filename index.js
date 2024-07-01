import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import createTask from "./commands/create.task.js";
import listTasks from "./commands/list.task.js";
import removeTaskById from "./commands/remove.task.js";
import updateTask from "./commands/update.task.js";
import * as initDB from "./core/db/init.js";
import {
  CREATE_MENU,
  LIST_MENU,
  MENU_CHOICES,
  REMOVE_MENU,
  UPDATE_MENU,
} from "./core/constants/index.js";

const program = new Command();
initDB.connect();

const welcomeScreen = () => {
  // console.clear();
  console.log("Welcome to the Task Planner");
  loadMenu();
};

const loadMenu = () => {
  new inquirer.Separator();
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: MENU_CHOICES,
      },
    ])
    .then((answers) => {
      executeUserAction(answers.action);
    });
};

const executeUserAction = (action) => {
  switch (action) {
    case CREATE_MENU:
      createTask().then(() => loadMenu());
      return;
    case LIST_MENU:
      listTasks().then(() => loadMenu());
      return;
    case REMOVE_MENU:
      removeTaskById().then(() => loadMenu());
      return;
    case UPDATE_MENU:
      updateTask().then(() => loadMenu());
      return;
    default:
      process.exit(0);
  }
};

program
  .command("start")
  .description("Start the application")
  .action(() => {
    welcomeScreen();
  });

program.parse();

async function handleShutdown() {
  let spinner = ora("Shutting down").start();
  try {
    // clean up
    await initDB.disconnect();
  } catch (error) {
    console.error("Error during shutdown:", error);
  } finally {
    spinner.stop();
  }
}

process.on("exit", handleShutdown);
process.on("unhandledRejection", handleShutdown);
process.on("uncaughtException", handleShutdown);
