// app/_layout.tsx

import 'react-native-reanimated';  // 반드시 최상단에서 import
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { TranslationProvider } from './_context/TranslationContext';
import { Ionicons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import { FavouriteProvider } from './_context/FavouriteContext';

// webcrypto polyfill
if (typeof global.crypto === 'undefined') {
  global.crypto = {} as any;
}
if (typeof global.crypto.getRandomValues === 'undefined') {
  global.crypto.getRandomValues = Crypto.getRandomValues as any;
}

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

// 라우팅 타입 정의
type RouteNames = 
  | 'screens/home/index'
  | 'screens/banking/index'
  | 'screens/housing/index'
  | 'screens/legal/index'
  | 'screens/english/index'
  | 'screens/jobs/index'
  | 'screens/favourite/index'
  | 'screens/emergency/index'
  | 'screens/profile/index'
  | 'screens/chatbot/index'
  | 'screens/location/enable-location'
  | 'screens/hospital/index'
  | 'screens/transport/index'
  | 'screens/transport/1/index'
  | 'screens/transport/2/index'
  | 'screens/transport/2/fares/index'
  | 'screens/transport/2/manage/index'
  | 'screens/transport/3/index'
  | 'screens/transport/4/index'
  | 'screens/healthcare/index'
  | 'screens/symptoms/index'
  | '_components/WebTranslate';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      [key: string]: RouteNames;
    }
  }
}

// 라우팅 타입 확장
declare module 'expo-router' {
  type RouteNames = 
    | 'screens/home/index'
    | 'screens/banking/index'
    | 'screens/housing/index'
    | 'screens/legal/index'
    | 'screens/english/index'
    | 'screens/jobs/index'
    | 'screens/favourite/index'
    | 'screens/emergency/index'
    | 'screens/profile/index'
    | 'screens/chatbot/index'
    | 'screens/location/enable-location'
    | 'screens/hospital/index'
    | 'screens/transport/index'
    | 'screens/transport/1/index'
    | 'screens/transport/2/index'
    | 'screens/transport/2/fares/index'
    | 'screens/transport/2/manage/index'
    | 'screens/transport/3/index'
    | 'screens/transport/4/index'
    | 'screens/healthcare/index'
    | 'screens/symptoms/index'
    | '_components/WebTranslate';
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ ...Ionicons.font });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TranslationProvider>
          <FavouriteProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="screens/home/index" />
              <Stack.Screen name="screens/banking/index" />
              <Stack.Screen name="screens/housing/index" />
              <Stack.Screen name="screens/legal/index" />
              <Stack.Screen name="screens/english/index" />
              <Stack.Screen name="screens/jobs/index" />
              <Stack.Screen name="screens/favourite/index" />
              <Stack.Screen name="screens/emergency/index" />
              <Stack.Screen name="screens/profile/index" />
              <Stack.Screen name="screens/chatbot/index" />
              <Stack.Screen name="screens/location/enable-location" />
              <Stack.Screen name="screens/hospital/index" />
              <Stack.Screen name="screens/transport/index" />
              <Stack.Screen name="screens/transport/1/index" />
              <Stack.Screen name="screens/transport/2/index" />
              <Stack.Screen name="screens/transport/2/fares/index" />
              <Stack.Screen name="screens/transport/2/manage/index" />
              <Stack.Screen name="screens/transport/3/index" />
              <Stack.Screen name="screens/transport/4/index" />
              <Stack.Screen name="screens/healthcare/index" />
              <Stack.Screen name="screens/symptoms/index" />
              <Stack.Screen name="_components/WebTranslate" />
            </Stack>
          </FavouriteProvider>
        </TranslationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
