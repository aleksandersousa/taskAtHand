/* eslint-disable @typescript-eslint/no-empty-interface */
import theme from './schema.json';

export type Theme = typeof theme.data.light;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
