import { Command } from "@/types/types";
import type { Message } from "discord.js";

const fact: Command = {
  name: "fact",
  description: "Gives a random cat fact.",
  execute: async (_args: string[], message: Message): Promise<void> => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        await message.reply(
          "Oops, I couldn't get a fact right now. Try again later!"
        );
        return;
      }
      const data = await response.json();
      await message.reply(data.fact);
    } catch (error) {
      console.error(error);
      await message.reply("Something went wrong fetching a fact!");
    }
  },
};

export default fact;
