import fs from "fs";
import path from "path";
import type { Message } from "discord.js";
import { Action } from "@/types/types";

const actions = new Map<string, Action>();

const actionsPath = path.join(__dirname, "../actions");

function loadActionsFromDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      loadActionsFromDir(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".ts") || entry.name.endsWith(".js"))
    ) {
      const imported = require(fullPath);
      const action: Action = imported.default ?? imported;
      if (action?.action) {
        actions.set(action.action, action);
      }
    }
  }
}

loadActionsFromDir(actionsPath);

export default async function actionHandler(
  actionName: string,
  params: Record<string, any>,
  message: Message
): Promise<void> {
  const action = actions.get(actionName);

  if (!action) {
    await message.reply(`Unknown action: ${actionName}`);
    return;
  }

  try {
    await action.execute(params, message);
  } catch (err) {
    console.error(err);
    await message.reply(`Error executing action: ${actionName}`);
  }
}
