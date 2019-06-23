export const createManager = () => {
  const sheets: HTMLStyleElement[] = [];

  return {
    css: (sheet: string, className?: string) => {
      const element = document.createElement('style');
      element.innerText = sheet;
      sheets.push(element);
      document.head.appendChild(element);
      return className;
    },
    removeAll: () => {
      sheets.forEach(sheet => document.head.removeChild(sheet));
      sheets.length = 0;
    },
  };
};
