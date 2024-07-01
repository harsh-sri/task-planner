import { Command } from "commander";
import inquirer from "inquirer";
import createTask from "./commands/create.task.js";
import listTasks from "./commands/list.task.js";
import * as initDB from "./core/db/init.js";

const program = new Command();
initDB.connect();

const welcomeScreen = () => {
  console.clear();
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
        choices: ["Create", "List", "Exit"],
      },
    ])
    .then((answers) => {
      executeUserAction(answers.action);
    });
};

const executeUserAction = (action) => {
  switch (action) {
    case "Create":
      createTask().then(() => loadMenu());
      return;
    case "List":
      listTasks().then(() => loadMenu());
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
