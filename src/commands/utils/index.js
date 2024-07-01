import chalk from "chalk";
import inquirer from "inquirer";

function isValidObjectId(id) {
  // Check if the string is a 24-character hexadecimal string
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
}

export async function getTaskId() {
  try {
    const userInput = await inquirer.prompt([
      {
        name: "taskId",
        message: "Please enter taskId",
        type: "input",
        validate: (input) =>
          input.trim() && isValidObjectId(input.trim())
            ? true
            : "Please enter a valid task Id.",
      },
    ]);
    return userInput.taskId;
  } catch (err) {
    console.log("Something went wrong. Please try again.\n", err);
  }
}
