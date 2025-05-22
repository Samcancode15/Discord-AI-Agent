import { Command } from "@/types/types";
import { Message } from "discord.js";

const pingCommand: Command = {
  name: "ping",
  description: "Replies with Pong!",
  execute: async (args: string[], message: Message) => {
    await message.reply("Pong!");
  },
};

export default pingCommand;
