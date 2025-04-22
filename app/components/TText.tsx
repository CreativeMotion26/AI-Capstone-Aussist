import React, { useEffect } from 'react';
import { Text, TextProps } from 'react-native';
import { useTranslation } from '../context/TranslationContext';

type Props = TextProps & { children: string };

const TText: React.FC<Props> = ({ children, ...rest }) => {
  const { translatedTexts, registerText } = useTranslation();

  useEffect(() => { registerText(children); }, [children]);

  return <Text {...rest}>{translatedTexts[children] ?? children}</Text>;
};

export default TText;
