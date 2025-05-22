import { Command } from "@/types/types";
import type { Message } from "discord.js";

const joke: Command = {
  name: "joke",
  description: "Replies with a random joke!",
  execute: async (_args: string[], message: Message): Promise<void> => {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      if (!response.ok) {
        await message.reply(
          "Oops, I couldn't get a joke right now. Try again later!"
        );
        return;
      }
      const data = await response.json();
      await message.reply(`${data.setup} ||${data.punchline}||`);
    } catch (error) {
      console.error(error);
      await message.reply("Something went wrong fetching a joke!");
    }
  },
};

export default joke;
