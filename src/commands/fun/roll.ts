import { Command } from "@/types/types";
import type { Message } from "discord.js";

const roll: Command = {
  name: "roll",
  description: "Rolls a dice.",
  execute: async (args: string[], message: Message): Promise<void> => {
    const rollResult = Math.floor(Math.random() * 6) + 1;
    await message.reply(rollResult.toString());
  },
};

export default roll;
