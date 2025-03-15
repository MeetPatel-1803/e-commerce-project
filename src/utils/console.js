import console from 'console';

const prepare = (color, ...logs) => {
  const aLogs = [];
  for (let i = 0; i < logs.length; i += 1) {
    aLogs.push(`\x1b${color}`);
    aLogs.push(typeof logs[i] === 'object' ? JSON.stringify(logs[i], null, 2) : logs[i]);
  }
  aLogs.push('\x1b[0m');
  console.log(...aLogs);
};

const log = {
  black: () => {},
  green: () => {},
  yellow: () => {},
  blue: () => {},
  magenta: () => {},
  cyan: () => {},
  trace: () => {},
  white: () => {},
  error: () => {}
};

log.black = (...logs) => prepare('[30m', ...logs);
log.green = (...logs) => prepare('[32m', ...logs);
log.yellow = (...logs) => prepare('[33m', ...logs);
log.blue = (...logs) => prepare('[34m', ...logs);
log.magenta = (...logs) => prepare('[35m', ...logs);
log.cyan = (...logs) => prepare('\x1b[1;36m', ...logs);
log.white = (...logs) => prepare('[37m', ...logs);
log.error = console.trace;
log.error = console.error;

export default log;
