import * as dotenv from "dotenv";
dotenv.config();

/**
 *
 * @returns {db} object with mongo uri
 */
export const mongo = () => {
  return {
    uri: process.env.MONGO_URI,
  };
};

/**
 *
 * @returns {messages} object to simplify cli-messages throughout the application
 */
export const messages = () => {
  return {
    db: {
      waiting_to_connect:
        "establishing connection to the database, please wait...",
      connected: "connected to the database",
      disconnect: "database disconnected.",
    },
  };
};
