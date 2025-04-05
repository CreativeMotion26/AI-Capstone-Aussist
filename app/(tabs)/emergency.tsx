import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const emergencyContacts = [
    { number: '000', title: 'Emergency Services', description: 'Police, Fire, Ambulance' },
    { number: '131 444', title: 'Police Assistance', description: 'Non-emergency police assistance' },
    { number: '1800 022 222', title: 'Health Direct', description: '24/7 health advice' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Emergency Numbers Section */}
          <View className="mb-8">
            <Text className="text-2xl font-bold mb-4">Emergency Contacts</Text>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-red-50 p-4 rounded-xl mb-3 flex-row items-center"
              >
                <View className="bg-red-500 w-12 h-12 rounded-full items-center justify-center mr-4">
                  <Text className="text-white font-bold">{contact.number}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-lg">{contact.title}</Text>
                  <Text className="text-gray-600">{contact.description}</Text>
                </View>
                <Ionicons name="call" size={24} color="#EF4444" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Symptom Search Section */}
          <View>
            <Text className="text-2xl font-bold mb-4">Check Your Symptoms</Text>
            <View className="bg-gray-100 rounded-xl p-4 mb-4">
              <TextInput
                className="text-lg"
                placeholder="Search your symptoms..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Text className="text-gray-600 mt-2">
                Example: "fever", "headache", "cough"
              </Text>
            </View>

            {/* Quick Symptom Categories */}
            <View className="flex-row flex-wrap justify-between">
              {['Fever & Flu', 'Injuries', 'Stomach Pain', 'Breathing'].map((category, index) => (
                <TouchableOpacity 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 mb-3 w-[48%]"
                >
                  <Text className="font-medium text-center">{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 