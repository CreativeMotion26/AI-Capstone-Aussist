import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const facilities = [
  {
    name: 'Royal Prince Alfred Hospital',
    type: 'Public Hospital',
    address: '50 Missenden Rd, Camperdown',
    distance: '1.2 km',
    rating: 4.5,
    openNow: true
  },
  {
    name: 'St Vincent\'s Hospital',
    type: 'Public Hospital',
    address: '390 Victoria St, Darlinghurst',
    distance: '2.5 km',
    rating: 4.3,
    openNow: true
  }
];

export default function HealthcarePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Search Bar */}
          <View className="bg-gray-100 rounded-xl p-4 mb-6 flex-row items-center">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 text-lg ml-2"
              placeholder="Search hospitals, clinics..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Map Preview */}
          <View className="h-48 bg-gray-200 rounded-xl mb-6 overflow-hidden">
            <Text className="text-center p-4">Map View</Text>
          </View>

          {/* Facility List */}
          <View>
            <Text className="text-xl font-bold mb-4">Nearby Healthcare Facilities</Text>
            {facilities.map((facility, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="font-semibold text-lg">{facility.name}</Text>
                    <Text className="text-blue-500">{facility.type}</Text>
                    <Text className="text-gray-600 mt-1">{facility.address}</Text>
                    <View className="flex-row items-center mt-2">
                      <Ionicons name="star" size={16} color="#FFB800" />
                      <Text className="ml-1">{facility.rating}</Text>
                      <Text className="mx-2">•</Text>
                      <Text className="text-gray-600">{facility.distance}</Text>
                      {facility.openNow && (
                        <>
                          <Text className="mx-2">•</Text>
                          <Text className="text-green-600">Open now</Text>
                        </>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity className="bg-blue-500 rounded-full p-2">
                    <Ionicons name="navigate" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 