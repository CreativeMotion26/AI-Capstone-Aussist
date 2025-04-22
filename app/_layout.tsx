import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme, Animated, View, StyleSheet } from 'react-native';
import CustomSplash from './components/CustomSplash';
import { TranslationProvider } from '../app/context/TranslationContext'; 

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [splashFinished, setSplashFinished] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    // Hide the native splash screen when fonts are loaded
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Pre-load the main content with 0 opacity
  useEffect(() => {
    if (splashFinished) {
      // Fade in the main content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [splashFinished, fadeAnim]);

  // Handle splash screen finish with a smooth transition
  const handleSplashFinish = () => {
    // Add a delay before showing the main content
    setTimeout(() => {
      setSplashFinished(true);
    }, 100); // 1.5 seconds delay
  };

  if (!loaded) {
    return null;
  }

  return (
    <TranslationProvider>
      <View style={styles.container}>
        {!splashFinished && <CustomSplash onFinish={handleSplashFinish} />}
        
        <Animated.View 
          style={[
            styles.mainContent,
            { 
              opacity: fadeAnim,
              // Keep it mounted but invisible before splash is finished
              // This prevents the black flash
              display: splashFinished ? 'flex' : 'flex',
              zIndex: splashFinished ? 1 : 0,
            }
          ]}
        >
          <Stack>
            {splashFinished && (
              <Stack.Screen 
                name="index" 
                options={{ 
                  headerShown: false,
                  presentation: 'modal',
                  animation: 'fade'
                }} 
              />
            )}
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false
              }} 
            />
          </Stack>
        </Animated.View>
      </View>
    </TranslationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
