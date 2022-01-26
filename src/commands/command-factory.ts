import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';
import CommandPatterns from '@constants/command-patterns';
import { Command, Factory } from '@interfaces';

@injectable()
class CommandFactory implements Factory<Command> {
  constructor(
    @inject(Types.Ping) private readonly ping: Command,
    @inject(Types.Foo) private readonly foo: Command,
  ) {}

  findPattern(patternList: string[], pattern: string): string {
    return patternList.includes(pattern) ? pattern : '';
  }

  getInstance(pattern: string): Command {
    const { findPattern } = this;

    switch (pattern) {
      case findPattern(CommandPatterns.ping, pattern):
        return this.ping;

      case findPattern(CommandPatterns.foo, pattern):
        return this.foo;

      default:
        return null;
    }
  }
}

export default CommandFactory;
