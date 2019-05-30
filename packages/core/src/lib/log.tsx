import { name, version } from '../../package.json';

export const throwIf = (check: any, message: string) => {
  if (check) {
    throw new Error(`${name} v${version}

${message}`);
  }
};

export const warn = (message: string) => {
  console.warn(`${name} v${version}

${message}`);
};
