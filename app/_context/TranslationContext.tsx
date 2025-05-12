// app/context/TranslationContext.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyCrJ08nSLPdTpE6sn2P9x4i8UN80Yd-Gtw';
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

type Map = { [key: string]: string };

// 특정 단어에 대한 수동 번역 정의
const manualTranslations: { [key: string]: { [key: string]: string } } = {
  ko: {
    'Bond': '보증금',
    'Security deposit (usually 4 weeks rent) held by the Rental Bond Board. Returned at end of tenancy if no issues.': 
    '임대 보증금(보통 4주치 월세)은 임대 보증금 위원회에서 보관합니다. 문제가 없으면 임대 종료 시 반환됩니다.',
    'Symptom Checker': '증상 검사',
    'Transport': '교통',
    'Banking': '은행',
    'Housing': '주거',
    'Legal': '법률',
    'Learn English': '영어 학습',
    'Jobs': '고용',
    'Emergency': '응급',
    'Profile': '내 정보',
  },
  // 다른 언어에 대한 수동 번역도 여기에 추가할 수 있습니다
};

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

    // 수동 번역이 있는 경우 먼저 적용
    const manualTranslatedMap: Map = {};
    if (manualTranslations[lang]) {
      arr.forEach(text => {
        if (manualTranslations[lang][text]) {
          manualTranslatedMap[text] = manualTranslations[lang][text];
        }
      });
    }

    // 수동 번역이 없는 텍스트만 Google Translate로 번역
    const textsToTranslate = arr.filter(text => !manualTranslatedMap[text]);
    
    const chunks = await Promise.all(textsToTranslate.map(q =>
      axios.get(BASE_URL, { params:{ q, target: lang, key: API_KEY } })
           .then(res => res.data.data.translations[0].translatedText)
           .catch(() => q)
    ));

    // 수동 번역과 Google 번역 결과 합치기
    const map: Map = { ...manualTranslatedMap };
    textsToTranslate.forEach((orig, i) => (map[orig] = chunks[i]));
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
