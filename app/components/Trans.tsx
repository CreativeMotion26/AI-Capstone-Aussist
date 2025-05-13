// components/Trans.tsx
import React, { useEffect } from 'react';

import { useTranslation } from '../context/TranslationContext';
import TText from '../_components/TText';

export const Trans = ({ children }: { children: string }) => {
  const { translatedTexts, registerText } = useTranslation();

  useEffect(() => {
    registerText(children);
  }, [children]);

  return <TText>{translatedTexts[children] || children}</TText>;
};
