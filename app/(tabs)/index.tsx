import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ServiceCard from '../components/ServiceCard';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' }
];

const services = [
  {
    id: 'emergency',
    title: 'Emergency Contacts',
    description: 'Quick access to emergency services',
    color: '#FFE8E8',
    icon: <Ionicons name="medkit" size={28} color="#F87171" />
  },
  {
    id: 'healthcare',
    title: 'Find Healthcare',
    description: 'Locate hospitals and pharmacies',
    color: '#E0F2FE',
    icon: <Ionicons name="heart" size={28} color="#38BDF8" />
  },
  {
    id: 'translation',
    title: 'Translation',
    description: 'Get help with language',
    color: '#F3E8FF',
    icon: <Ionicons name="globe" size={28} color="#A855F7" />
  },
  {
    id: 'banking',
    title: 'Banking Info',
    description: 'Australian banking services',
    color: '#ECFCCB',
    icon: <Ionicons name="card" size={28} color="#84CC16" />
  }
];

export default function HomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="pt-6 px-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-3xl font-bold text-gray-900">Aussist</Text>
              <Text className="text-sm text-gray-500">Your Australian Guide</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="notifications-outline" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Language Selector */}
          <View className="flex-row mb-6">
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => setSelectedLanguage(lang.code)}
                className={`px-4 py-2 rounded-full mr-2 ${
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

          {/* Main Services */}
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4">How can we help you?</Text>
            <View className="flex-row flex-wrap justify-between">
              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  className="w-[48%] mb-4"
                  onPress={() => {}}
                >
                  <View 
                    className="p-4 rounded-xl" 
                    style={{ backgroundColor: service.color }}
                  >
                    <View className="h-12">{service.icon}</View>
                    <Text className="text-lg font-semibold mt-3">{service.title}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{service.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Access */}
          <View className="mb-8">
            <Text className="text-xl font-bold mb-4">Quick Access</Text>
            <TouchableOpacity 
              className="bg-orange-50 p-4 rounded-xl mb-3 flex-row items-center"
            >
              <View className="bg-orange-500 w-12 h-12 rounded-full items-center justify-center mr-4">
                <Ionicons name="call" size={22} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-lg">Emergency Call</Text>
                <Text className="text-gray-600">Call 000 for emergencies</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-blue-50 p-4 rounded-xl mb-3 flex-row items-center"
            >
              <View className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center mr-4">
                <Ionicons name="map" size={22} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-lg">Nearest Hospital</Text>
                <Text className="text-gray-600">Find healthcare nearby</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
