import { createLogger, transports, addColors } from 'winston';
import { levelColors } from '@constants/logger';
import loggingConfig from '@config/logger';

const logger = createLogger({
  exitOnError: false,
  transports: [new transports.Console(loggingConfig.console)],
});

addColors(levelColors);

export default logger;
