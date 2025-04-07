import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import OnboardingPage from './components/OnboardingPage';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Welcome to Aussist',
    description: 'Your guide to settling in Australia',
    imageSource: { uri: 'https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_960_720.jpg' },
    buttonText: 'Next',
    backgroundColor: '#ffffff',
  },
  {
    title: 'Find Healthcare Services',
    description: 'Easily locate hospitals and medical care when you need it',
    imageSource: { uri: 'https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309_960_720.jpg' },
    buttonText: 'Next',
    backgroundColor: '#ffffff',
  },
  {
    title: 'Translation Help',
    description: 'Get language assistance whenever you need it',
    imageSource: { uri: 'https://cdn.pixabay.com/photo/2017/09/21/19/12/france-2773030_960_720.jpg' },
    buttonText: 'Next',
    backgroundColor: '#ffffff',
  },
  {
    title: 'Improve your skills',
    description: 'Access resources to help you settle in Australia',
    imageSource: { uri: 'https://cdn.pixabay.com/photo/2019/04/15/11/47/australia-4129242_960_720.jpg' },
    buttonText: 'Get Started',
    backgroundColor: '#ffffff',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      // Last page, navigate to home
      router.replace('/(tabs)');
    }
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        className='flex justify-center items-center bottom-8 w-full'
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnboardingPage
              title={item.title}
              description={item.description}
              imageSource={item.imageSource}
              buttonText={item.buttonText}
              onPress={handleNext}
              backgroundColor={item.backgroundColor}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <View className="flex-row justify-center items-center absolute bottom-8 w-full">
        {onboardingData.map((_, index) => (
          <TouchableOpacity
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
            }`}
            onPress={() => {
              flatListRef.current?.scrollToIndex({
                index,
                animated: true,
              });
              setCurrentIndex(index);
            }}
          />
        ))}
      </View>
    </View>
  );
} 