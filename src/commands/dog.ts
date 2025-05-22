import { Command } from "@/types/types";
import type { Message } from "discord.js";
import { AttachmentBuilder } from "discord.js";

const dog: Command = {
  name: "dog",
  description: "Gives a random image of a dog.",
  execute: async (args: string[], message: Message): Promise<void> => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) {
        await message.reply("Failed to fetch a dog image.");
        return;
      }

      const data = await response.json();
      const imageUrl = data.message;

      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        await message.reply("Failed to download the dog image.");
        return;
      }
      const imageBuffer = await imageResponse.arrayBuffer();

      const attachment = new AttachmentBuilder(Buffer.from(imageBuffer), {
        name: "dog.jpg",
      });

      await message.reply({ files: [attachment] });
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while fetching a dog image.");
    }
  },
};

export default dog;
