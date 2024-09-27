import { ja } from "./ja";

export const translations = {
  ja,
} as const;

export type SupportedLanguages = keyof typeof translations;
