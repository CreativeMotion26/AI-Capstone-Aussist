import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../_lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TText from '../../_components/TText';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const profileSettings = [
  {
    title: 'Account Settings',
    items: [
      { icon: 'person-outline' as IconName,  label: 'Personal Information' },
      { icon: 'shield-checkmark-outline' as IconName, label: 'Security' },
      { icon: 'notifications-outline' as IconName, label: 'Notifications' }
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'language-outline' as IconName, label: 'Language' },
      { icon: 'moon-outline' as IconName,      label: 'Theme' },
      { icon: 'location-outline' as IconName,  label: 'Location Services' }
    ]
  },
  {
    title: 'Support & Feedback',
    items: [
      { icon: 'help-circle-outline' as IconName, label: 'Help Center' },
      { icon: 'chatbubble-outline' as IconName,   label: 'Contact Support' },
      { icon: 'star-outline' as IconName,         label: 'Rate the App' }
    ]
  }
];

const userDocuments = [
  { title: 'Visa Information',     completed: true  },
  { title: 'Medicare Details',     completed: false },
  { title: 'Identification',       completed: true  },
  { title: 'Emergency Contacts',   completed: false }
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />

      {/* header */}
      <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Profile</Text>
        <TText style={{ fontSize: 16, color: 'white' }}>Manage your account and preferences</TText>
      </View>

      <ScrollView>
        <View style={{ padding: 16 }}>

          {/* user info */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View style={{
              width: 80, height: 80, borderRadius: 40, backgroundColor: '#F3F4F6',
              alignItems: 'center', justifyContent: 'center', marginBottom: 12
            }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary }}>JS</Text>
            </View>
            {/* name / email could also be translated if needed */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>John Smith</Text>
            <Text style={{ color: '#6B7280' }}>john.smith@example.com</Text>

            <TouchableOpacity style={{
              marginTop: 12, backgroundColor: theme.colors.primary,
              paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20
            }}>
              <TText style={{ color: 'white' }}>Edit Profile</TText>
            </TouchableOpacity>
          </View>

          {/* onboarding progress */}
          <View style={{ marginBottom: 24, padding: 16, backgroundColor: '#F3F4F6', borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <TText style={{ fontWeight: 'bold' }}>Onboarding Status</TText>
              <TText>50% Complete</TText>
            </View>
            <View style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
              <View style={{ height: '100%', width: '50%', backgroundColor: theme.colors.primary }} />
            </View>
          </View>

          {/* documents */}
          <View style={{ marginBottom: 24 }}>
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Your Documents</TText>
            {userDocuments.map((doc, i) => (
              <View key={i} style={{
                flexDirection: 'row', alignItems: 'center', marginBottom: 12, padding: 12,
                backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8
              }}>
                <Ionicons name={doc.completed ? 'checkmark-circle' : 'alert-circle'}
                          size={20}
                          color={doc.completed ? '#10B981' : '#F59E0B'}
                          style={{ marginRight: 12 }} />
                <TText>{doc.title}</TText>
              </View>
            ))}
          </View>

          {/* settings sections */}
          {profileSettings.map((section, i) => (
            <View key={i} style={{ marginBottom: 24 }}>
              <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{section.title}</TText>
              {section.items.map((item, j) => (
                <TouchableOpacity
                  key={j}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 8,
                    marginBottom: 8
                  }}
                >
                  <Ionicons name={item.icon} size={20} color="#6B7280" style={{ marginRight: 12 }} />
                  <TText>{item.label}</TText>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 