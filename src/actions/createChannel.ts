import { Message, GuildChannelCreateOptions } from "discord.js";
import { Action } from "@/types/types";

const createChannel: Action = {
  action: "createChannel",
  description: "Creates a new text channel in the server.",
  format: {
    action: "createChannel",
    params: {
      name: "general",
      reason: "Optional reason here",
    },
  },
  execute: async (params: Record<string, any>, message: Message) => {
    const { name, reason } = params;

    if (!name || typeof name !== "string") {
      await message.reply("Missing or invalid 'name' parameter.");
      return;
    }

    await message.guild?.channels.create({
      name,
      reason,
      type: 0,
    } as GuildChannelCreateOptions);

    await message.reply(`Channel "${name}" created.`);
  },
};

export default createChannel;
