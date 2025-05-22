import { Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  execute: (...args: any[]) => Promise<void> | void;
}

export interface Action {
  action: string;
  description: string;
  format: {
    action: string;
    params: Record<string, any>;
  };
  execute: (params: Record<string, any>, message: Message) => Promise<void>;
}
