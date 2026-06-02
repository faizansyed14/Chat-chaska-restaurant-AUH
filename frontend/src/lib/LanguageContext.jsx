import { createContext, useContext, useEffect, useState } from "react";
import { LANGUAGES, T } from "@/lib/i18n";

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
  }, [lang]);

  const t = T[lang] || T.en;
  const dir = (LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]).dir;

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  // Safe fallback so components work even outside the provider.
  if (!ctx) return { lang: "en", setLang: () => {}, t: T.en, dir: "ltr" };
  return ctx;
}
