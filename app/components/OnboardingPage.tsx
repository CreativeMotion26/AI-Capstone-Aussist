import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

interface OnboardingPageProps {
  title: string;
  description: string;
  imageSource: any;
  buttonText: string;
  onPress: () => void;
  backgroundColor?: string;
  buttonColor?: string;
}

const { width } = Dimensions.get('window');

export default function OnboardingPage({
  title,
  description,
  imageSource,
  buttonText,
  onPress,
  backgroundColor = '#ffffff',
  buttonColor = '#F76B56'
}: OnboardingPageProps) {
  return (
    <View 
      className="flex-1 items-center justify-between p-5"
      style={{ backgroundColor }}
    >
      <View className="flex-1 justify-center items-center w-full">
        <Image 
          source={imageSource} 
          className="w-[70%] h-[70%]" 
          style={{ width: width * 0.7, height: width * 0.7 }}
          resizeMode="contain" 
        />
      </View>
      
      <View className="w-full items-center mb-8">
        <Text className="text-2xl font-bold text-center mb-2 text-gray-800">{title}</Text>
        <Text className="text-base text-center mb-8 text-gray-600 px-5">{description}</Text>
        
        <TouchableOpacity 
          className="w-full py-4 rounded-full items-center justify-center"
          style={{ backgroundColor: buttonColor }}
          onPress={onPress}
        >
          <Text className="text-white text-base font-semibold">{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 