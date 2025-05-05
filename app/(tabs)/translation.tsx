import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_KEY } from '@env';

const translationServices = [
  {
    title: 'TIS National',
    description: 'Free telephone interpreting service',
    phone: '131 450',
    available: '24/7',
    type: 'Government Service',
  },
  {
    title: 'On-site Interpreter',
    description: 'Book an interpreter for in-person assistance',
    type: 'Professional Service',
  },
];

// Google Cloud Translation API
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

const translateText = async (text: string, targetLanguage: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: text,
        target: targetLanguage,
        key: API_KEY,
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export default function TranslationPage() {
  const [translatedHeader, setTranslatedHeader] = useState('Translation Services');

  const handleTranslateKo = async () => {
    const result = await translateText('Translation Services', 'ko');
    setTranslatedHeader(result);
  };

  const handleTranslateEn = async () => {
    const result = await translateText('Translation Services', 'en');
    setTranslatedHeader(result);
  };

  const handleTranslateVe = async () => {
    const result = await translateText('Translation Services', 'vi');
    setTranslatedHeader(result);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Static Header (translated when button is pressed) */}
          <Text className="text-xl font-bold mb-4">{translatedHeader}</Text>

          {/* Translate Button */}
          <Button title="Translate to Korean" onPress={handleTranslateKo} />
          <Button title="Translate to English" onPress={handleTranslateEn} />
          <Button title="Translate to Viet" onPress={handleTranslateVe} />

          {/* Services List */}
          {translationServices.map((service, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 mt-4"
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="font-semibold text-lg">{service.title}</Text>
                  <Text className="text-gray-600">{service.description}</Text>
                  {service.phone && (
                    <View className="flex-row items-center mt-2">
                      <Ionicons name="call-outline" size={16} color="#666" />
                      <Text className="ml-2 text-blue-500">{service.phone}</Text>
                    </View>
                  )}
                  {service.available && (
                    <Text className="text-green-600 mt-1">{service.available}</Text>
                  )}
                </View>
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-600 text-sm">{service.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
