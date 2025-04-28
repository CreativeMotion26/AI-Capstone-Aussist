import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center">
      {showBack && (
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-4"
        >
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
      )}
      <Text className="text-xl font-semibold flex-1">{title}</Text>
    </View>
  );
} 