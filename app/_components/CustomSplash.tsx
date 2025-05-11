import * as React from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

interface CustomSplashProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

export default function CustomSplash({ onFinish }: CustomSplashProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    // Hide the splash screen after a delay
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
      />
      <Image
        source={require('../../assets/images/splash-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator 
        size="large" 
        color="#5CC6FF" 
        style={styles.spinner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  backgroundImage: {
    position: 'absolute',
    width,
    height,
    resizeMode: 'cover',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.3,
    marginBottom: 24,
  },
  spinner: {
    marginTop: 20,
  },
}); 