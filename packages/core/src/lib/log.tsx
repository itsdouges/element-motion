export const throwIf = (check: any, message: string) => {
  if (check) {
    throw new Error(`@element-motion

${message}`);
  }
};

export const warn = (message: string) => {
  console.warn(`@element-motion

${message}`);
};
