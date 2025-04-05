import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' }
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
}

export default function LanguageSelector({ 
  selectedLanguage, 
  onSelectLanguage 
}: LanguageSelectorProps) {
  return (
    <View className="flex-row space-x-2 mb-6">
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => onSelectLanguage(lang.code)}
          className={`px-4 py-2 rounded-full ${
            selectedLanguage === lang.code 
              ? 'bg-orange-500' 
              : 'bg-gray-100'
          }`}
        >
          <Text className={`${
            selectedLanguage === lang.code 
              ? 'text-white' 
              : 'text-gray-600'
          }`}>
            {lang.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
} 