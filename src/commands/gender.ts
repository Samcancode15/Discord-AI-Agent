import { Command } from "@/types/types";
import type { Message } from "discord.js";

const gender: Command = {
  name: "gender",
  description: "Tries to guess your gender by your name.",
  execute: async (args: string[], message: Message): Promise<void> => {
    if (args.length === 0) {
      await message.reply("Please provide a name to guess the gender.");
      return;
    }

    const name = args[0].toLowerCase();
    const url = `https://api.genderize.io?name=${encodeURIComponent(name)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        await message.reply("Failed to fetch gender data.");
        return;
      }

      const json = await response.json();

      if (json.gender && json.probability) {
        const probabilityPercent = (json.probability * 100).toFixed(2);
        await message.reply(`You are ${probabilityPercent}% ${json.gender}`);
      } else {
        await message.reply(
          `Sorry, I couldn't determine the gender for the name "${name}".`
        );
      }
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while fetching gender data.");
    }
  },
};

export default gender;
