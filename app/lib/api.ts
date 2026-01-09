// app/lib/api.ts
import Constants from 'expo-constants';

function guessLocalHost(): string {
  // e.g. 192.168.0.23:19000 → 192.168.0.23
  const host = (Constants.expoConfig?.hostUri ?? '').split(':')[0];
  return host ? `http://${host}:8000` : 'http://localhost:8000';
}

export { API_BASE } from '../config';