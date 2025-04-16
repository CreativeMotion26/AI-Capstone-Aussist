// app/context/TranslationContext.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Replace this with your actual API key
const API_KEY = 'AIzaSyCrJ08nSLPdTpE6sn2P9x4i8UN80Yd-Gtw';
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

const TranslationContext = createContext<any>(null);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [translatedTexts, setTranslatedTexts] = useState<{ [key: string]: string }>({});

  const translateText = async (text: string, targetLanguage: string) => {
    if (!text || !targetLanguage) return text;

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: text,
          target: targetLanguage,
          key: API_KEY,
        },
      });
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // fallback to original
    }
  };

  const translateAll = async (texts: string[], targetLanguage: string) => {
    const translations = await Promise.all(
      texts.map(text => translateText(text, targetLanguage))
    );
    const translatedMap = texts.reduce((acc, text, index) => {
      acc[text] = translations[index];
      return acc;
    }, {} as { [key: string]: string });
    setTranslatedTexts(translatedMap);
  };

  return (
    <TranslationContext.Provider value={{ translatedTexts, translateAll }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
