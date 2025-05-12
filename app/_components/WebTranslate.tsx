import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { useTranslation } from '../_context/TranslationContext';

export default function WebTranslate() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [useExternalBrowser, setUseExternalBrowser] = useState(false);
  const { selectedLanguage } = useTranslation();

  const handleError = () => {
    setUseExternalBrowser(true);
  };

  useEffect(() => {
    if (useExternalBrowser && url) {
      Linking.openURL(decodeURIComponent(url));
    }
  }, [useExternalBrowser, url]);

  if (!url) return null;

  const decodedUrl = decodeURIComponent(url);
  const translateUrl = `https://translate.google.com/translate?sl=auto&tl=${selectedLanguage}&u=${encodeURIComponent(decodedUrl)}`;

  if (useExternalBrowser) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Web Translate' }} />
      <View style={styles.container}>
        <WebView
          source={{ uri: translateUrl }}
          style={styles.webview}
          onError={handleError}
          onHttpError={handleError}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
}); 