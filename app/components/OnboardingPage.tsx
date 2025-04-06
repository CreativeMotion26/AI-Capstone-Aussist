import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

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
      <View className="flex-1 justify-center items-center w-full pt-8">
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
        
        <Button
          variant="default"
          size="lg"
          className="w-full rounded-full"
          style={{ backgroundColor: buttonColor }}
          icon={buttonText === 'Get Started' ? <Ionicons name="arrow-forward" size={20} color="white" /> : undefined}
          iconPosition="right"
          onPress={onPress}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  );
} 