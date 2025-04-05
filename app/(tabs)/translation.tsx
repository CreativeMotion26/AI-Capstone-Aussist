import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const translationServices = [
  {
    title: 'TIS National',
    description: 'Free telephone interpreting service',
    phone: '131 450',
    available: '24/7',
    type: 'Government Service'
  },
  {
    title: 'On-site Interpreter',
    description: 'Book an interpreter for in-person assistance',
    type: 'Professional Service'
  }
];

export default function TranslationPage() {
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Korean');
  const [text, setText] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Language Selection */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="flex-1 bg-gray-100 p-4 rounded-xl mr-2">
              <Text className="text-gray-600">From</Text>
              <Text className="text-lg font-semibold">{fromLanguage}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-12 items-center justify-center">
              <Ionicons name="swap-horizontal" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-100 p-4 rounded-xl ml-2">
              <Text className="text-gray-600">To</Text>
              <Text className="text-lg font-semibold">{toLanguage}</Text>
            </TouchableOpacity>
          </View>

          {/* Translation Input */}
          <View className="bg-gray-100 rounded-xl p-4 mb-6">
            <TextInput
              className="min-h-[100px] text-lg"
              multiline
              placeholder="Enter text to translate..."
              value={text}
              onChangeText={setText}
            />
          </View>

          {/* Translation Services */}
          <Text className="text-xl font-bold mb-4">Translation Services</Text>
          {translationServices.map((service, index) => (
            <TouchableOpacity 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
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