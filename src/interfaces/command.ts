import { Message } from 'discord.js';

interface Command {
  readonly name: string;
  readonly description: string;
  readonly guildOnly: boolean;
  readonly argsCount: number;
  readonly examples: string[];
  canExecute(message: Message, parsedContent: string[]): boolean;
  execute(message: Message, parsedContent: string[]): Promise<void>;
}

export default Command;
