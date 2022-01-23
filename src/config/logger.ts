import { format } from 'winston';

export default {
  console: {
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.simple(),
      format.printf((msg) =>
        format
          .colorize()
          .colorize(
            msg.level,
            `${msg.timestamp} - ${msg.level}: ${msg.message}`,
          ),
      ),
      format.errors(),
    ),
  },
};
