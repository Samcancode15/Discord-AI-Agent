import { Command } from "@/types/types";
import type { Message } from "discord.js";

const country: Command = {
  name: "country",
  description: "Tries to guess your nationality by your name.",
  execute: async (args: string[], message: Message): Promise<void> => {
    if (args.length === 0) {
      await message.reply("Please provide a name to guess the country.");
      return;
    }

    const name = args[0].toLowerCase();
    const url = `https://api.nationalize.io/?name=${encodeURIComponent(name)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        await message.reply("Failed to fetch country data.");
        return;
      }

      const json = await response.json();

      if (json.country && json.country.length > 0) {
        const sortedCountries = json.country.sort(
          (a: { probability: number }, b: { probability: number }) =>
            b.probability - a.probability
        );
        const topCountry = sortedCountries[0];
        const probabilityPercent = (topCountry.probability * 100).toFixed(2);
        await message.reply(
          `The name "${name}" is most likely from ${topCountry.country_id} with a probability of ${probabilityPercent}%.`
        );
      } else {
        await message.reply(
          `Sorry, I couldn't determine the country for the name "${name}".`
        );
      }
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while fetching country data.");
    }
  },
};

export default country;
