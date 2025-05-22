import dotenv from "dotenv";

dotenv.config();

const config = {
  DISCORD_COMMAND_PREFIX: process.env.DISCORD_COMMAND_PREFIX || "?",
};

export default config;
