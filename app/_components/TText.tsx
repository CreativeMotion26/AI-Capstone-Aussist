import React, { useEffect } from 'react';
import { Text } from 'react-native';
import type { ComponentProps } from 'react';
import { useTranslation } from '../_context/TranslationContext';

type Props = ComponentProps<typeof Text> & { children: React.ReactNode };

const TText: React.FC<Props> = ({ children, ...rest }) => {
  const { translatedTexts, registerText } = useTranslation();

  useEffect(() => {
    if (typeof children === 'string') {
      registerText(children);
    }
  }, [children, registerText]);

  if (typeof children !== 'string') {
    return <Text {...rest}>{children}</Text>;
  }

  return (
    <Text {...rest}>
      {translatedTexts[children] || children}
    </Text>
  );
};

export default TText;
