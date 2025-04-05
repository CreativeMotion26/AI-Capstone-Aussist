import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
        tabBarActiveTintColor: '#F76B56',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "medkit" : "medkit-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="healthcare"
        options={{
          title: 'Healthcare',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="translation"
        options={{
          title: 'Translate',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "globe" : "globe-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
