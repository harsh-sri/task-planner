import chalk from "chalk";
import inquirer from "inquirer";

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

    return userInput.taskId.trim();
  } catch (err) {
    console.log("Something went wrong. Please try again.\n", err);
  }
}
