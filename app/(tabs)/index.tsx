import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/Card';
import { theme } from '../lib/theme';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' }
];

// Define Ionicons name type
type IconName = React.ComponentProps<typeof Ionicons>['name'];

const serviceCategories = [
  {
    id: 'emergency',
    title: 'Emergency Services',
    description: 'Quick access to emergency contacts and nearby hospitals',
    icon: 'alert-circle-outline' as IconName,
    route: '/(tabs)/emergency'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Find hospitals, Medicare information, and medical services',
    icon: 'medkit-outline' as IconName,
    route: '/(tabs)/healthcare'
  },
  {
    id: 'housing',
    title: 'Housing',
    description: 'Find accommodation and rental assistance',
    icon: 'home-outline' as IconName,
    route: '/(tabs)/housing'
  },
  {
    id: 'translation',
    title: 'Translation',
    description: 'Language assistance and interpreting services',
    icon: 'language-outline' as IconName,
    route: '/(tabs)/translation'
  },
  {
    id: 'banking',
    title: 'Banking & Finance',
    description: 'Australian banking systems and financial assistance',
    icon: 'card-outline' as IconName,
    route: '/(tabs)/banking'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Schools, universities and learning options',
    icon: 'school-outline' as IconName,
    route: '/(tabs)/education'
  }
];

export default function HomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        {/* Header that extends under the dynamic island */}
        <View 
          style={{ 
            paddingTop: insets.top, 
            paddingBottom: 16, 
            paddingHorizontal: 16, 
            backgroundColor: theme.colors.primary 
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Aussist</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>Your guide to settling in Australia</Text>
        </View>

        <View style={{ padding: 16 }}>
          {/* Language Selector */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Select your language:</Text>
            <View style={{ flexDirection: 'row' }}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => setSelectedLanguage(lang.code)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    marginRight: 8,
                    backgroundColor: selectedLanguage === lang.code ? theme.colors.primary : 'white',
                    borderWidth: 1,
                    borderColor: selectedLanguage === lang.code ? theme.colors.primary : '#E5E7EB'
                  }}
                >
                  <Text style={{ 
                    color: selectedLanguage === lang.code ? 'white' : '#6B7280' 
                  }}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Quick Actions</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <TouchableOpacity 
                style={{ alignItems: 'center', width: 80, marginRight: 16 }}
                onPress={() => router.push('/(tabs)/emergency' as any)}
              >
                <View style={{ backgroundColor: '#FEE2E2', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Ionicons name="call-outline" size={24} color="#DC2626" />
                </View>
                <Text style={{ textAlign: 'center' }}>Emergency</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ alignItems: 'center', width: 80, marginRight: 16 }}
                onPress={() => router.push('/(tabs)/healthcare' as any)}
              >
                <View style={{ backgroundColor: '#E0F2FE', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Ionicons name="medkit-outline" size={24} color="#0284C7" />
                </View>
                <Text style={{ textAlign: 'center' }}>Healthcare</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ alignItems: 'center', width: '30%' }}
                onPress={() => router.push('/(tabs)/translation' as any)}
              >
                <View style={{ backgroundColor: '#F3E8FF', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Ionicons name="language-outline" size={24} color="#7E22CE" />
                </View>
                <Text style={{ textAlign: 'center' }}>AI Translate</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{ alignItems: 'center', width: 80 }}
                onPress={() => router.push('/' as any)}
              >
                <View style={{ backgroundColor: '#E3F2FD', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Ionicons name="search-outline" size={24} color="#1976D2" />
                </View>
                <Text style={{ textAlign: 'center' }}>Find Service</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Services Section */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Services for you</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <TouchableOpacity 
                style={{ width: '48%', backgroundColor: 'white', borderRadius: 8, overflow: 'hidden', marginBottom: 16, shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2, borderWidth: 1, borderColor: '#E5E7EB' }}
                onPress={() => router.push('/symptoms')}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60' }} 
                  style={{ width: '100%', height: 100 }} 
                />
                <Text style={{ padding: 8, textAlign: 'center', fontWeight: '500' }}>Symptom Checker</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '48%', backgroundColor: 'white', borderRadius: 8, overflow: 'hidden', marginBottom: 16, shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2, borderWidth: 1, borderColor: '#E5E7EB' }}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&auto=format&fit=crop&q=60' }} 
                  style={{ width: '100%', height: 100 }} 
                />
                <Text style={{ padding: 8, textAlign: 'center', fontWeight: '500' }}>Find Hospital</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '48%', backgroundColor: 'white', borderRadius: 8, overflow: 'hidden', marginBottom: 16, shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2, borderWidth: 1, borderColor: '#E5E7EB' }}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60' }} 
                  style={{ width: '100%', height: 100 }} 
                />
                <Text style={{ padding: 8, textAlign: 'center', fontWeight: '500' }}>Disease Information</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '48%', backgroundColor: 'white', borderRadius: 8, overflow: 'hidden', marginBottom: 16, shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2, borderWidth: 1, borderColor: '#E5E7EB' }}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60' }} 
                  style={{ width: '100%', height: 100 }} 
                />
                <Text style={{ padding: 8, textAlign: 'center', fontWeight: '500' }}>Healthcare Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Services Categories */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Services & Information</Text>
            
            {serviceCategories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                onPress={() => router.push(category.route as any)}
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  padding: 16, 
                  borderRadius: 8,
                  backgroundColor: 'white',
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}
              >
                <View style={{ marginRight: 16 }}>
                  <Ionicons name={category.icon} size={24} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', marginBottom: 4 }}>{category.title}</Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>{category.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
