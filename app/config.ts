import Constants from 'expo-constants';
import { Platform } from 'react-native';

function defaultBase(): string {
  // 1. physical phone – use LAN IP from hostUri (53.x SDK format)
  const hostUri = (Constants.expoConfig?.hostUri ??
                   Constants.manifest2?.extra?.expoServerPort ??
                   '').toString();

  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:8000`;
  }

  // 2. emulators fallbacks
  if (Platform.OS === 'android') return 'http://10.0.2.2:8000';
  if (Platform.OS === 'ios')     return 'http://127.0.0.1:8000';
  return 'http://localhost:8000';
}

export const API_BASE = "http://192.168.1.117:8000";
