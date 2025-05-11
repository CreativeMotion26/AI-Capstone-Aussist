// app/lib/api.ts
import Constants from 'expo-constants';


function guessLocalHost(): string {
  // e.g. 192.168.0.23:19000 → 192.168.0.23
  const host = (Constants.expoConfig?.hostUri ?? '').split(':')[0];
  return host ? `http://${host}:8001` : 'http://localhost:8001';
}

// Use the guessed localhost in development, or a production URL in production
export const API_BASE = __DEV__ ? guessLocalHost() : 'https://your-production-api.com';

export default {
  API_BASE
};


export const API_BASE = "http://192.168.1.255:8001";

