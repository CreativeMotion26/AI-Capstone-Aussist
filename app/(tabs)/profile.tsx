import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const profileSettings = [
  {
    title: 'Account Settings',
    items: [
      { icon: 'person-outline' as IconName, label: 'Personal Information' },
      { icon: 'shield-checkmark-outline' as IconName, label: 'Security' },
      { icon: 'notifications-outline' as IconName, label: 'Notifications' }
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'language-outline' as IconName, label: 'Language' },
      { icon: 'moon-outline' as IconName, label: 'Theme' },
      { icon: 'location-outline' as IconName, label: 'Location Services' }
    ]
  },
  {
    title: 'Support & Feedback',
    items: [
      { icon: 'help-circle-outline' as IconName, label: 'Help Center' },
      { icon: 'chatbubble-outline' as IconName, label: 'Contact Support' },
      { icon: 'star-outline' as IconName, label: 'Rate the App' }
    ]
  }
];

const userDocuments = [
  { title: 'Visa Information', completed: true },
  { title: 'Medicare Details', completed: false },
  { title: 'Identification', completed: true },
  { title: 'Emergency Contacts', completed: false }
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      {/* Header that extends under the dynamic island */}
      <View style={{ 
        paddingTop: insets.top, 
        paddingBottom: 16, 
        paddingHorizontal: 16, 
        backgroundColor: theme.colors.primary 
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Profile</Text>
      </View>
      
      <ScrollView>
        <View style={{ padding: 16 }}>
          {/* User Info */}
          <View style={{ 
            alignItems: 'center', 
            marginBottom: 24
          }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: '#F3F4F6', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 12 
            }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary }}>JS</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>John Doe</Text>
            <Text style={{ color: '#6B7280' }}>john.smith@example.com</Text>
            <TouchableOpacity 
              style={{ 
                marginTop: 12,
                backgroundColor: theme.colors.primary,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20
              }}
            >
              <Text style={{ color: 'white' }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          {/* Onboarding */}
          <View style={{ 
            marginBottom: 24, 
            padding: 16, 
            backgroundColor: '#F3F4F6', 
            borderRadius: 8 
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              marginBottom: 8 
            }}>
              <Text style={{ fontWeight: 'bold' }}>Onboarding Status</Text>
              <Text>50% Complete</Text>
            </View>
            <View style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
              <View style={{ 
                height: '100%', 
                width: '50%', 
                backgroundColor: theme.colors.primary 
              }} />
            </View>
          </View>
          
          {/* Documents */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Your Documents</Text>
            {userDocuments.map((doc, index) => (
              <View 
                key={index}
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginBottom: 12, 
                  padding: 12,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 8
                }}
              >
                <Ionicons 
                  name={doc.completed ? 'checkmark-circle' : 'alert-circle'} 
                  size={20} 
                  color={doc.completed ? theme.colors.success : theme.colors.warning} 
                  style={{ marginRight: 12 }}
                />
                <Text style={{ flex: 1 }}>{doc.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            ))}
          </View>
          
          {/* Settings List */}
          {profileSettings.map((section, sectionIndex) => (
            <View key={sectionIndex} style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{section.title}</Text>
              <View style={{ 
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 8,
                overflow: 'hidden'
              }}>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity 
                    key={itemIndex}
                    style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      padding: 16,
                      borderBottomWidth: itemIndex < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: '#E5E7EB'
                    }}
                  >
                    <View style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: 16, 
                      backgroundColor: '#F3F4F6', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      marginRight: 12 
                    }}>
                      <Ionicons name={item.icon} size={16} color="#6B7280" />
                    </View>
                    <Text style={{ flex: 1 }}>{item.label}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          
          {/* Log Out */}
          <TouchableOpacity 
            style={{ 
              marginBottom: 24,
              padding: 16,
              borderWidth: 1,
              borderColor: '#FEE2E2',
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#DC2626" style={{ marginRight: 8 }} />
            <Text style={{ color: '#DC2626', fontWeight: '500' }}>Log Out</Text>
          </TouchableOpacity>
          
          {/* App Version */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ color: '#9CA3AF', fontSize: 12 }}>Aussist App v1.1.0</Text>
            <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>© 2025 Aussist</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 