const safeConsole = (globalThis as any)['console'] || {};

function group(...args: any[]) {
  const fn = safeConsole['group'] || safeConsole['log'];
  try {
    return fn.apply(safeConsole, args as any);
  } catch {
    return undefined;
  }
}

function groupEnd(...args: any[]) {
  const fn = safeConsole['groupEnd'] || safeConsole['log'];
  try {
    return fn.apply(safeConsole, args as any);
  } catch {
    return undefined;
  }
}

function log(...args: any[]) {
  const fn = safeConsole['log'] || (() => {});
  try {
    return fn.apply(safeConsole, args as any);
  } catch {
    return undefined;
  }
}

function info(...args: any[]) {
  const fn = safeConsole['info'] || safeConsole['log'] || (() => {});
  try {
    return fn.apply(safeConsole, args as any);
  } catch {
    return undefined;
  }
}

function warn(...args: any[]) {
  const fn = safeConsole['warn'] || safeConsole['log'] || (() => {});
  try {
    return fn.apply(safeConsole, args as any);
  } catch {
    return undefined;
  }
}

function error(...args: any[]) {
  const fn = safeConsole['error'] || safeConsole['log'] || (() => {});
  try {
    return fn.apply(safeConsole, args as any);
  } catch {
    return undefined;
  }
}

const debug = {
  group,
  groupEnd,
  log,
  info,
  warn,
  error,
};

export default debug;
