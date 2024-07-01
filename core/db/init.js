import mongoose from "mongoose";
import chalk from "chalk";
import ora from "ora";
import * as config from "../config/index.js";

/**
 * Function to connect to the database
 */
export const connect = () => {
  const mongo = config.mongo();
  const {
    db: { waiting_to_connect, connected },
  } = config.messages();
  try {
    const spinner = ora(waiting_to_connect).start();
    mongoose.connect(mongo.uri);
    spinner.stop();
    console.log(chalk.greenBright(connected));
  } catch (err) {
    console.log(chalk.redBright("err: "), err);
    process.exit(1);
  }
};

/**
 * Function to disconnect. Can be useful in clean-shutdown process
 */
export const disconnect = async () => {
  const {
    db: { disconnect },
  } = config.messages();
  try {
    await mongoose.disconnect();
    console.log(chalk.greenBright(disconnect));
  } catch (err) {
    console.log(chalk.redBright("err: "), err);
    process.exit(1);
  }
};
