import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Keyboard } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

const transportOptions = [
  {
    id: '1',
    name: 'Ways to Get Around',
    desc: 'Choose your preferred mode of transport in NSW',
    icon: <MaterialIcons name="directions-bus" size={31} color="#FF9800" />,
    color: '#FF9800'
  },
  {
    id: '2',
    name: 'Tickets and Fares',
    desc: 'How to pay for your travel',
    icon: <FontAwesome name="credit-card" size={25} color="#03A9F4" />,
    color: '#03A9F4'
  },
  {
    id: '3',
    name: 'Routes and Timetables',
    desc: "Find routes and check timetables",
    icon: <MaterialIcons name="schedule" size={31} color="#F44336" />,
    color: '#F44336'
  },
  {
    id: '4',
    name: 'Help and Support',
    desc: 'Get help and contact information',
    icon: <MaterialIcons name="support-agent" size={31} color="#4CAF50" />,
    color: '#4CAF50'
  },
  {
    id: '5',
    name: 'FAQ',
    desc: 'Find answers to frequently asked questions',
    icon: <MaterialIcons name="help-outline" size={31} color="#9C27B0" />,
    color: '#9C27B0',
    path: '/transport/4/faq'
  }
];

export default function TransportScreen() {
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
          title: 'Transport in NSW',
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.servicesContainer}>
            <Image 
              source={require('../../assets/sydney-train.jpg')}
              style={styles.headerImage}
              resizeMode="cover"
            />
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
              <TextInput
                ref={searchInputRef}
                style={styles.searchInput}
                placeholder="Search transport services..."
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
            {transportOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.serviceCard}
                onPress={() => router.push(option.path || `/transport/${option.id}`)}
              >
                <View style={[styles.iconContainer, { backgroundColor: 'transparent' }]}> 
                  {option.icon}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.serviceTitle}>{option.name}</Text>
                  <Text style={styles.serviceDesc}>{option.desc}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#1976D2" />
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
  servicesContainer: {
    padding: 15,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
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
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
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
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  serviceDesc: {
    fontSize: 14,
    color: '#666',
  },
}); 