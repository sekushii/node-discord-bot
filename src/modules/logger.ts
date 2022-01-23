import { createLogger, transports, addColors } from 'winston';
import { WINSTON_LEVEL_COLORS } from '@constants/logging';
import loggingConfig from '@config/logger';

const logger = createLogger({
  exitOnError: false,
  transports: [new transports.Console(loggingConfig.console)],
});

addColors(WINSTON_LEVEL_COLORS);

export default logger;
