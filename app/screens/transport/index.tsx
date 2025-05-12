import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useTranslation } from '../../_context/TranslationContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';

const transportCategories = [
  {
    id: '1',
    title: 'Ways to Get Around',
    description: 'Choose your preferred mode of transport in NSW',
    icon: 'directions-bus',
    color: '#FF9800'
  },
  {
    id: '2',
    title: 'Tickets and Fares',
    description: 'How to pay for your travel',
    icon: 'credit-card',
    color: '#03A9F4'
  },
  {
    id: '3',
    title: 'Routes and Timetables',
    description: 'Find routes and check timetables',
    icon: 'schedule',
    color: '#F44336'
  },
  {
    id: '4',
    title: 'Help and Support',
    description: 'Get help and contact information',
    icon: 'support-agent',
    color: '#4CAF50'
  }
];

export default function TransportPage() {
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Transport");
    registerText("Public Transport Information");
    registerText("Find information about public transport in NSW");
    transportCategories.forEach(category => {
      registerText(category.title);
      registerText(category.description);
    });
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Transport"] || "Transport",
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: theme.colors.primary }]}>
            <Text style={styles.headerTitle}>
              {translatedTexts["Public Transport Information"] || "Public Transport Information"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {translatedTexts["Find information about public transport in NSW"] || "Find information about public transport in NSW"}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../../assets/images/sydney-train.jpg')}
              style={styles.headerImage}
              resizeMode="cover"
            />
            </View>

          <View style={styles.categoriesContainer}>
            {transportCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => router.push(`/screens/transport/${category.id}`)}
              >
                <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                  <MaterialIcons name={category.icon as any} size={31} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.categoryTitle}>
                    {translatedTexts[category.title] || category.title}
                  </Text>
                  <Text style={styles.categoryDescription}>
                    {translatedTexts[category.description] || category.description}
                  </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={20} color="#03A9F4" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
  },
  imageContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  categoriesContainer: {
    padding: 15,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 