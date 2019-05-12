import pkg from '../../package.json';

export const precondition = (check: any, message: string) => {
  if (!check) {
    throw new Error(`yubaba v${pkg.version}

${message}`);
  }
};

export const warn = (message: string) => {
  console.warn(`yubaba v${pkg.version}

${message}`);
};
