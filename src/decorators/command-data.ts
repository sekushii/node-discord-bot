const commandData = function <T extends { new (...args: any[]): {} }>({
  decoratedName,
  decoratedDescription,
  decoratedGuildOnly,
  decoratedArgsCount,
  decoratedExamples,
}: {
  decoratedName: string;
  decoratedDescription: string;
  decoratedGuildOnly: boolean;
  decoratedArgsCount: number;
  decoratedExamples: string[];
}) {
  return (constructor: T) =>
    class extends constructor {
      name = decoratedName;

      description = decoratedDescription;

      guildOnly = decoratedGuildOnly;

      argsCount = decoratedArgsCount;

      examples = decoratedExamples;

      canExecute;

      execute;
    };
};

export default commandData;
