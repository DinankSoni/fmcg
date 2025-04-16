import winston from 'winston';

// Create a logger with a default level of 'info'
export const logger = winston.createLogger({
  level: 'info',
  // Format the log messages with timestamps and JSON
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  // Define the transports for the logger
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log errors to a file named 'error.log'
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Log all messages to a file named 'combined.log'
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
