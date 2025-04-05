import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, Link } from 'expo-router';

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  link?: any;
}

export default function Card({ title, description, icon, link }: CardProps) {
  return (
    <TouchableOpacity
      onPress={() => link && router.push(link as never)}
      className="bg-white p-4 rounded-xl shadow-sm mb-4"
    >
      <View className="flex-row items-center space-x-3">
        {icon && (
          <Text className="text-2xl">{icon}</Text>
        )}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{title}</Text>
          <Text className="text-gray-600 mt-1">{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
} 