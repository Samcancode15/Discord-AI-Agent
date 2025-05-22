import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const promptPath = path.join(__dirname, "prompt.txt");
const BASE_SYSTEM_PROMPT = fs.readFileSync(promptPath, "utf-8");

const config = {
  DISCORD_COMMAND_PREFIX: process.env.DISCORD_COMMAND_PREFIX || "?",
  OLLAMA_API_URL: process.env.OLLAMA_API_URL
    ? process.env.OLLAMA_API_URL.replace(/\/$/, "")
    : "http://localhost:11434/",
  OLLAMA_MODEL_NAME: process.env.OLLAMA_MODEL_NAME || "deepseek-coder:6.7b",
  BASE_SYSTEM_PROMPT,
};

export default config;
