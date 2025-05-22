import { Client, IntentsBitField, Message } from "discord.js";
import handleCommand from "@/handlers/commandHandler";
import dotenv from "dotenv";
import config from "@/config/config";

dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async (message: Message) => {
  if (
    message.author.bot ||
    !message.content.startsWith(config.DISCORD_COMMAND_PREFIX)
  )
    return;

  const args = message.content.slice(1).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  await handleCommand(commandName, args, message);
});

client.login(process.env.DISCORD_TOKEN);
