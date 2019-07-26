let id = 0;

export const createManager = () => {
  id += 1;
  const sheets: HTMLStyleElement[] = [];

  return {
    id,
    css: (sheet: string, className?: string) => {
      const element = document.createElement('style');
      element.setAttribute('data-element-motion', `css-manager-${id}`);
      element.innerHTML = sheet;
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

export type StyleSheetManager = ReturnType<typeof createManager>;
