export interface Command {
  name: string;
  description: string;
  execute: (...args: any[]) => Promise<void> | void;
}
