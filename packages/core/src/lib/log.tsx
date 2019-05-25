import pkg from '../../package.json';

export const precondition = (check: any, message: string) => {
  if (!check) {
    throw new Error(`@element-motion/core v${pkg.version}

${message}`);
  }
};

export const warn = (message: string) => {
  console.warn(`@element-motion/core v${pkg.version}

${message}`);
};
