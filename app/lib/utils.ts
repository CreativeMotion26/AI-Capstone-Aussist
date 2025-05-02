import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Constants from "expo-constants";

/** read the value no matter which manifest format we’re on */
function readApiBase() {
  return (
    Constants.expoConfig?.extra?.API_BASE ??
    Constants.manifest2?.extra?.expoClient?.extra?.API_BASE ??
    Constants.manifest?.extra?.API_BASE ??
    ""        // last-resort empty string
  );
}

export const API_BASE = readApiBase();

/*  don’t crash the native bridge – just warn in dev */
if (!API_BASE && __DEV__) {
  console.warn(
    "[Aussist] ⚠️  API_BASE is missing - add it to app.config.js → extra"
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
