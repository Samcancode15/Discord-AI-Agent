import { Command } from "@/types/types";
import type { Message } from "discord.js";

const eightBall: Command = {
  name: "8ball",
  description: "Replies with a random answer to your question.",
  execute: async (args: string[], message: Message): Promise<void> => {
    const responses = [
      "It is certain.",
      "Without a doubt.",
      "You may rely on it.",
      "Yes – definitely.",
      "It is decidedly so.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];

    const answer = responses[Math.floor(Math.random() * responses.length)];

    await message.reply(answer);
  },
};

export default eightBall;
