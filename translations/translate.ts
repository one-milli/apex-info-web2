import { translations, SupportedLanguages } from ".";

const currentLanguage: SupportedLanguages = "ja";

export function t(key: keyof (typeof translations)[SupportedLanguages]): string {
  return translations[currentLanguage][key];
}
