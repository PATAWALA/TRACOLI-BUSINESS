"use client";

import {
  createContext,
  useContext,
  useState,
  createElement,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, type Locale } from "@/data/content";

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const Ctx = createContext<LocaleCtx>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  return createElement(Ctx.Provider, { value: { locale, setLocale } }, children);
}

export const useLocale = () => useContext(Ctx);