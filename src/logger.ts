type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const logLevelOrder: LogLevel[] = ['debug', 'info', 'warn', 'error'];

let currentLogLevel: LogLevel = 'info';

function setLogLevel(level: LogLevel) {
  currentLogLevel = level;
}

function shouldLog(level: LogLevel): boolean {
  return logLevelOrder.indexOf(level) >= logLevelOrder.indexOf(currentLogLevel);
}

function getCurrentTime(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function colorize(message: string, colorCode: string): string {
  const reset = '\x1b[0m';
  return `${colorCode}${message}${reset}`;
}

function info(message: string) {
  if (shouldLog('info')) {
    console.log(colorize(`[INFO] [${getCurrentTime()}]:`, '\x1b[36m'), message);
  }
}

function warn(message: string) {
  if (shouldLog('warn')) {
    console.warn(colorize(`[WARN] [${getCurrentTime()}]:`, '\x1b[33m'), message);
  }
}

function error(message: string) {
  if (shouldLog('error')) {
    console.error(colorize(`[ERROR] [${getCurrentTime()}]:`, '\x1b[31m'), message);
  }
}

function debug(message: string) {
  if (shouldLog('debug')) {
    console.debug(colorize(`[DEBUG] [${getCurrentTime()}]:`, '\x1b[32m'), message);
  }
}

// Objeto logger exportado
const logger = {
  setLogLevel,
  debug,
  error,
  info,
  warn
};

export default logger;
