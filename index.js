import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import createTask from "./src/commands/create.task.js";
import listTasks from "./src/commands/list.task.js";
import removeTaskById from "./src/commands/remove.task.js";
import updateTask from "./src/commands/update.task.js";
import * as initDB from "./src/core/db/init.js";
import { MENU_CHOICES, MENU_OPTIONS } from "./src/core/constants/index.js";

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
    case MENU_OPTIONS.CREATE:
      createTask().then(() => loadMenu());
      return;
    case MENU_OPTIONS.LIST:
      listTasks().then(() => loadMenu());
      return;
    case MENU_OPTIONS.REMOVE:
      removeTaskById().then(() => loadMenu());
      return;
    case MENU_OPTIONS.UPDATE:
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
