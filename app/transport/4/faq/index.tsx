import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

const faqCategories = [
  {
    id: '1',
    title: 'Opal Card',
    desc: 'Questions about Opal card usage and benefits',
    icon: 'card-outline',
    color: '#9C27B0',
    questions: [
      {
        id: '1-1',
        question: 'How do I get an Opal card?',
        answer: 'You can get an Opal card at most convenience stores, newsagents, and online. You can also purchase one at train stations and ferry wharves.'
      },
      {
        id: '1-2',
        question: 'How do I top up my Opal card?',
        answer: 'You can top up your Opal card online, at Opal retailers, train stations, or using the Opal Travel app.'
      }
    ]
  },
  {
    id: '2',
    title: 'Fares and Payments',
    desc: 'Information about fares and payment methods',
    icon: 'cash-outline',
    color: '#FF9800',
    questions: [
      {
        id: '2-1',
        question: 'How much does public transport cost?',
        answer: 'Fares vary depending on the distance traveled and the mode of transport. You can use the fare calculator on our website to estimate costs.'
      },
      {
        id: '2-2',
        question: 'What payment methods are accepted?',
        answer: 'We accept Opal cards, contactless credit/debit cards, and mobile payments. Some services also accept cash.'
      }
    ]
  },
  {
    id: '3',
    title: 'Trip Planning',
    desc: 'How to plan your journey',
    icon: 'map-outline',
    color: '#03A9F4',
    questions: [
      {
        id: '3-1',
        question: 'How do I plan my trip?',
        answer: 'Use the Trip Planner by entering your origin and destination to find the best route and timetable. Real-time updates are also provided.'
      },
      {
        id: '3-2',
        question: 'Where can I check real-time service information?',
        answer: 'You can check real-time service information on the Transport for NSW app or website. You can also follow @T1SydneyTrains on Twitter for real-time updates.'
      }
    ]
  },
  {
    id: '4',
    title: 'Accessibility',
    desc: 'Information for passengers with accessibility needs',
    icon: 'accessibility-outline',
    color: '#4CAF50',
    questions: [
      {
        id: '4-1',
        question: 'Is wheelchair access available?',
        answer: 'Most train stations and buses are wheelchair accessible. Some older stations may have limited access, so it\'s best to check before traveling.'
      },
      {
        id: '4-2',
        question: 'How do I use the Travel Assistance service?',
        answer: 'Travel Assistance can be booked by calling 1800 637 500 at least 24 hours in advance. This is a free service for passengers with mobility restrictions.'
      }
    ]
  }
];

export default function FAQ() {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<TextInput>(null);

  const clearSearch = () => {
    setSearchText('');
    searchInputRef.current?.focus();
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'FAQ',
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
            <Text style={styles.headerSubtitle}>Find answers to common questions</Text>
          </View>

          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search FAQ..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              blurOnSubmit={false}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <MaterialIcons name="close" size={28} color="#666" style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.servicesContainer}>
            {faqCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.serviceCard}
                onPress={() => router.push(`/transport/4/faq/${category.id}` as any)}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                    <Ionicons name={category.icon as any} size={30} color="#fff" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.serviceTitle}>{category.title}</Text>
                    <Text style={styles.serviceDesc}>{category.desc}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#1976D2" />
                </View>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  servicesContainer: {
    padding: 15,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clearIcon: {
    marginLeft: 10,
  },
}); 