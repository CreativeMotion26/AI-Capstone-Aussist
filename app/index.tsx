import { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function SplashScreenPage() {
  useEffect(() => {
    // In a real app, you might fetch data or check user login status here
    const prepare = async () => {
      try {
        // Artificial delay to show splash screen
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // After we're done, hide the splash screen
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  // Redirect to the onboarding screen
  return <Redirect href="/onboarding" />;
} 