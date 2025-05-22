import { Command } from "@/types/types";
import type { Message } from "discord.js";

const echo: Command = {
  name: "echo",
  description: "Echoes back what the user says.",
  execute: async (args: string[], message: Message): Promise<void> => {
    if (args.length === 0) {
      await message.reply("Please provide something to echo.");
      return;
    }
    await message.reply(args.join("\u0020"));
  },
};

export default echo;
