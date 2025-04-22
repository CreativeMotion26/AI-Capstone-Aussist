// app/context/TranslationContext.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyCrJ08nSLPdTpE6sn2P9x4i8UN80Yd-Gtw';
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

type Map = { [key: string]: string };

interface Ctx {
  translatedTexts : Map;
  registerText    : (t: string) => void;
  translateAll    : (lang: string) => Promise<void>;
  selectedLanguage: string;
  setSelectedLanguage: (l: string) => void;
}

const TranslationContext = createContext<Ctx>(null as unknown as Ctx);

export const TranslationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [translatedTexts, setTranslatedTexts]   = useState<Map>({});
  const [registeredTexts, setRegisteredTexts]   = useState<Set<string>>(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  /** collect every key shown with <TText> */
  const registerText = (t: string) => {
    setRegisteredTexts(prev => (prev.has(t) ? prev : new Set(prev).add(t)));
  };

  /** Google‑translate ALL collected keys */
  const translateAll = async (lang: string) => {
    if (lang === 'en') { setTranslatedTexts({}); return; }

    const arr = Array.from(registeredTexts);
    if (!arr.length) return;

    const chunks = await Promise.all( arr.map(q =>
      axios.get(BASE_URL, { params:{ q, target: lang, key: API_KEY } })
           .then(res => res.data.data.translations[0].translatedText)
           .catch(() => q)
    ));

    const map: Map = {};
    arr.forEach((orig, i) => (map[orig] = chunks[i]));
    setTranslatedTexts(map);
  };

  return (
    <TranslationContext.Provider value={{
      translatedTexts, registerText, translateAll,
      selectedLanguage, setSelectedLanguage
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
