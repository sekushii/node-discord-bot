import { createLogger, transports, format, addColors } from 'winston';
import { WINSTON_LEVEL_COLORS } from '@constants/logging';

const LOG_CONFIG = {
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

const logger = createLogger({
  exitOnError: false,
  transports: [new transports.Console(LOG_CONFIG.console)],
});

addColors(WINSTON_LEVEL_COLORS);

export default logger;
