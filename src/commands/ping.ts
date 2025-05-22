import { Message } from "discord.js";

const pingCommand = {
  name: "ping",
  description: "Replies with Pong!",
  execute: async (args: string[], message: Message) => {
    await message.reply("Pong!");
  },
};

export default pingCommand;
