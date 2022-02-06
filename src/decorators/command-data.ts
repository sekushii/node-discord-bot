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
}): any {
  return (Target: T) =>
    class extends Target {
      name = decoratedName;

      description = decoratedDescription;

      guildOnly = decoratedGuildOnly;

      argsCount = decoratedArgsCount;

      examples = decoratedExamples;
    };
};

export default commandData;
