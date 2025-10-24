// Production no-op debug logger
const noop = (..._args: any[]) => undefined;

const debug = {
  group: noop as (...args: any[]) => void,
  groupEnd: noop as (...args: any[]) => void,
  log: noop as (...args: any[]) => void,
  info: noop as (...args: any[]) => void,
  warn: noop as (...args: any[]) => void,
  error: noop as (...args: any[]) => void,
};

export default debug;
