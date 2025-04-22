// components/Trans.tsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useTranslation } from '../context/TranslationContext';

export const Trans = ({ children }: { children: string }) => {
  const { translatedTexts, registerText } = useTranslation();

  useEffect(() => {
    registerText(children);
  }, [children]);

  return <Text>{translatedTexts[children] || children}</Text>;
};
