import * as React from 'react';

export interface Point {
  x: number;
  y: number;
}

export type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

export type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<
  infer P
>
  ? P
  : never;
