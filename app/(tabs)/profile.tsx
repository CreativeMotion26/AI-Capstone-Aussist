import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const profileSections = [
  {
    title: 'Account Settings',
    items: [
      { icon: 'person-outline' as IconName, label: 'Personal Information' },
      { icon: 'lock-closed-outline' as IconName, label: 'Password' },
      { icon: 'notifications-outline' as IconName, label: 'Notifications' }
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'language-outline' as IconName, label: 'Language' },
      { icon: 'moon-outline' as IconName, label: 'Dark Mode' },
      { icon: 'location-outline' as IconName, label: 'Location' }
    ]
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline' as IconName, label: 'Help Center' },
      { icon: 'chatbubble-outline' as IconName, label: 'Contact Us' },
      { icon: 'star-outline' as IconName, label: 'Rate Us' }
    ]
  }
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Profile Header */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                className="w-full h-full"
              />
            </View>
            <Text className="text-2xl font-bold">John Smith</Text>
            <Text className="text-gray-500">john.smith@example.com</Text>
            
            <View className="flex-row mt-4">
              <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full mr-2">
                <Text className="text-white">Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
                <Text className="text-gray-800">Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Profile Sections */}
          {profileSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-8">
              <Text className="text-lg font-bold mb-3">{section.title}</Text>
              <View className="bg-gray-50 rounded-xl overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity 
                    key={itemIndex}
                    className={`flex-row items-center p-4 border-b border-gray-100 ${
                      itemIndex === section.items.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-4">
                      <Ionicons name={item.icon} size={18} color="#3B82F6" />
                    </View>
                    <Text className="flex-1 text-gray-800">{item.label}</Text>
                    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          
          <TouchableOpacity className="mt-4 p-4 rounded-xl bg-red-50">
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text className="ml-3 text-red-500 font-semibold">Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 