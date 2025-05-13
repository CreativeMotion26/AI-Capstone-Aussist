import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TText from '../_components/TText';

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
      <View style={{ paddingTop: insets.top, paddingBottom: 16,
                     paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <TText style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Profile</TText>
      </View>

      <ScrollView>
        <View style={{ padding: 16 }}>

          {/* user info */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View style={{
              width: 80, height: 80, borderRadius: 40, backgroundColor: '#F3F4F6',
              alignItems: 'center', justifyContent: 'center', marginBottom: 12
            }}>
              <TText style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary }}>JS</TText>
            </View>
            {/* name / email could also be translated if needed */}
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>John Smith</TText>
            <TText style={{ color: '#6B7280' }}>john.smith@example.com</TText>

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
                          color={doc.completed ? theme.colors.success : theme.colors.warning}
                          style={{ marginRight: 12 }} />
                <TText style={{ flex: 1 }}>{doc.title}</TText>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            ))}
          </View>

          {/* settings sections */}
          {profileSettings.map((sec, si) => (
            <View key={si} style={{ marginBottom: 24 }}>
              <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{sec.title}</TText>

              <View style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E7EB',
                             borderRadius: 8, overflow: 'hidden' }}>
                {sec.items.map((it, ii) => (
                  <TouchableOpacity key={ii} style={{
                    flexDirection: 'row', alignItems: 'center', padding: 16,
                    borderBottomWidth: ii < sec.items.length - 1 ? 1 : 0,
                    borderBottomColor: '#E5E7EB'
                  }}>
                    <View style={{
                      width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6',
                      alignItems: 'center', justifyContent: 'center', marginRight: 12
                    }}>
                      <Ionicons name={it.icon} size={16} color="#6B7280" />
                    </View>
                    <TText style={{ flex: 1 }}>{it.label}</TText>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* log out */}
          <TouchableOpacity style={{
            marginBottom: 24, padding: 16, borderWidth: 1, borderColor: '#FEE2E2',
            borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
          }}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" style={{ marginRight: 8 }} />
            <TText style={{ color: '#DC2626', fontWeight: '500' }}>Log Out</TText>
          </TouchableOpacity>

          {/* app version */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <TText style={{ color: '#9CA3AF', fontSize: 12 }}>Aussist App v1.1.0</TText>
            <TText style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>© 2025 Aussist</TText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
