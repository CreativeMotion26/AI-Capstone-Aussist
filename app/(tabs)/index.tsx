import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/Card';
import { theme } from '../lib/theme';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TranslationProvider, useTranslation } from '.././context/TranslationContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' },
];

const serviceCategories = [
  {
    id: 'emergency',
    title: 'Emergency Services',
    description: 'Quick access to emergency contacts and nearby hospitals',
    icon: 'alert-circle-outline',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Find hospitals, Medicare information, and medical services',
    icon: 'medkit-outline',
  },
];

const HomeScreenContent = () => {
  const insets = useSafeAreaInsets();
  const { translatedTexts, translateAll } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const getText = (key: string, fallback: string) =>
    translatedTexts[key] || fallback;

  const handleTranslateAll = () => {
    const textsToTranslate = [
      'Quick Actions',
      'Services for you',
      'Services & Information',
      ...serviceCategories.flatMap((cat) => [cat.title, cat.description]),
    ];
    translateAll(textsToTranslate, selectedLanguage);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={{ paddingTop: insets.top, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Aussist</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>{getText('Your guide to settling in Australia', 'Your guide to settling in Australia')}</Text>
        </View>

        <View style={{ padding: 16 }}>
          {/* Language Selector */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Select your language:</Text>
            <View style={{ flexDirection: 'row' }}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => setSelectedLanguage(lang.code)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    marginRight: 8,
                    backgroundColor: selectedLanguage === lang.code ? theme.colors.primary : 'white',
                    borderWidth: 1,
                    borderColor: selectedLanguage === lang.code ? theme.colors.primary : '#E5E7EB',
                  }}
                >
                  <Text style={{ color: selectedLanguage === lang.code ? 'white' : '#6B7280' }}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ marginTop: 12 }}>
              <Button title="Translate All" onPress={handleTranslateAll} />
            </View>
          </View>

          {/* Service Categories */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{getText('Services & Information', 'Services & Information')}</Text>

            {serviceCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
              >
                <View style={{ marginRight: 16 }}>
                  <Ionicons name={category.icon as any} size={24} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', marginBottom: 4 }}>{getText(category.title, category.title)}</Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>{getText(category.description, category.description)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = () => (
  <TranslationProvider>
    <HomeScreenContent />
  </TranslationProvider>
);

export default HomeScreen;
