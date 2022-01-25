import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';
import Command from '@interfaces/command';
import CommandPatterns from '@constants/command-patterns';
import { Foo, Ping } from '.';

@injectable()
class CommandFactory {
  constructor(
    @inject(Types.Ping) private readonly ping: Ping,
    @inject(Types.Foo) private readonly foo: Foo,
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
