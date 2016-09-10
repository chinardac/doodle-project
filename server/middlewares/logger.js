import winston from 'winston';
import expressWinston from 'express-winston';

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      showLevel: false,
      timestamp: true
    })
  ],
  meta: false,
  expressFormat: true
});

export default logger;
