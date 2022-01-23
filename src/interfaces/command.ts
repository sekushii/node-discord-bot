import CommandId from '@constants/command-id';
import { Message } from 'discord.js';

interface Command {
  readonly id: CommandId;
  readonly name: string;
  readonly description: string;
  readonly guildOnly: boolean;
  readonly argsCount: number;
  readonly examples: string[];
  canExecute(message: Message, parsedContent: string[]): boolean;
  execute(message: Message, parsedContent: string[]): Promise<void>;
}

export default Command;
