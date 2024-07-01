import { Command } from "commander";
import inquirer from "inquirer";
import createTask from "./commands/create.task.js";
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
        choices: ["Create", "Exit"],
      },
    ])
    .then((answers) => {
      if (answers.action === "Create") {
        executeUserAction(answers.action);
      } else {
        process.exit(0);
      }
    });
};

const executeUserAction = (action) => {
  switch (action) {
    case "Create":
      createTask().then(() => {
        loadMenu();
      });
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
