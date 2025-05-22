import { Message } from "discord.js";
import fs from "fs";
import path from "path";
import { Command } from "@/types/types";

const commands = new Map<string, Command>();

const commandsPath = path.join(__dirname, "../commands");

function loadCommandsFromDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      loadCommandsFromDir(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".ts") || entry.name.endsWith(".js"))
    ) {
      const imported = require(fullPath);
      const command: Command = imported.default ?? imported;
      if (command?.name) {
        commands.set(command.name, command);
      }
    }
  }
}

loadCommandsFromDir(commandsPath);

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
