import { Message } from "discord.js";
import fs from "fs";
import path from "path";
import { Command } from "@/types/types";

const commands = new Map<string, Command>();

export function loadCommands() {
  const commandsPath = path.join(__dirname, "../commands");
  const files = fs.readdirSync(commandsPath);

  for (const file of files) {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      const command: Command = require(path.join(commandsPath, file)).default;
      commands.set(command.name, command);
    }
  }
}

loadCommands();

export default async function handleCommand(
  name: string,
  args: string[],
  message: Message
) {
  const command = commands.get(name);

  if (!command) {
    await message.reply("Command not found.");
    return;
  }

  try {
    await command.execute(args, message);
  } catch (err) {
    console.error(err);
    await message.reply("Error executing command.");
  }
}
