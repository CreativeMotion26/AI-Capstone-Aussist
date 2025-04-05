import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  backgroundColor?: string;
}

export default function ServiceCard({ 
  title, 
  description, 
  imageUrl, 
  link,
  backgroundColor = '#FFF5F1'
}: ServiceCardProps) {
  return (
    <TouchableOpacity
      onPress={() => router.push(link as never)}
      className="mb-4 w-full overflow-hidden"
    >
      <View className="rounded-3xl p-6" style={{ backgroundColor }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {title}
            </Text>
            <Text className="text-base text-gray-600">
              {description}
            </Text>
          </View>
          <Image
            source={{ uri: imageUrl }}
            className="w-24 h-24"
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
} 