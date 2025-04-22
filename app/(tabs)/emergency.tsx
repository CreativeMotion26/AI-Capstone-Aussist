import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../context/TranslationContext';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function EmergencyPage() {
  const insets = useSafeAreaInsets();
  const { translatedTexts } = useTranslation();
  const t = (key: string) => translatedTexts[key] || key;

  const emergencyContacts = [
    { number: '000', title: t('Emergency Services'), description: t('Police, Fire, Ambulance'), icon: 'call' as IconName },
    { number: '131 444', title: t('Police Assistance'), description: t('Non-emergency police assistance'), icon: 'shield' as IconName },
    { number: '1800 022 222', title: t('Health Direct'), description: t('24/7 health advice and information'), icon: 'medical' as IconName }
  ];

  const symptomCategories = [
    { name: t('Fever & Flu'), icon: 'thermometer-outline' as IconName },
    { name: t('Injuries'), icon: 'bandage-outline' as IconName },
    { name: t('Chest Pain'), icon: 'heart-outline' as IconName },
    { name: t('Breathing'), icon: 'fitness-outline' as IconName },
    { name: t('Stomach'), icon: 'medical-outline' as IconName },
    { name: t('Mental Health'), icon: 'brain-outline' as IconName }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top, 
        paddingBottom: 16, 
        paddingHorizontal: 16, 
        backgroundColor: theme.colors.primary 
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          {t('Emergency Services')}
        </Text>
      </View>

      <ScrollView>
        <View style={{ padding: 16 }}>

          {/* Alert Banner */}
          <View style={{ 
            backgroundColor: '#FEF2F2', 
            borderLeftWidth: 4, 
            borderLeftColor: '#DC2626', 
            padding: 16, 
            borderRadius: 6,
            marginBottom: 24, 
            flexDirection: 'row', 
            alignItems: 'center' 
          }}>
            <Ionicons name="warning" size={24} color="#DC2626" style={{ marginRight: 12 }} />
            <View>
              <Text style={{ fontWeight: 'bold', color: '#B91C1C', marginBottom: 4 }}>
                {t('In an emergency, call 000')}
              </Text>
              <Text style={{ color: '#B91C1C' }}>
                {t('For life-threatening situations, call Triple Zero immediately')}
              </Text>
            </View>
          </View>

          {/* Emergency Numbers Section */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
              {t('Emergency Contacts')}
            </Text>

            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity 
                key={index}
                style={{ 
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{ 
                  backgroundColor: '#FEE2E2', 
                  width: 42, 
                  height: 42, 
                  borderRadius: 21, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: 16 
                }}>
                  <Ionicons name={contact.icon} size={20} color="#DC2626" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{contact.title}</Text>
                  <Text style={{ color: '#6B7280' }}>{contact.description}</Text>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{contact.number}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Symptom Checker */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
              {t('Symptom Checker')}
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {symptomCategories.map((category, index) => (
                <TouchableOpacity 
                  key={index}
                  style={{ 
                    width: '30%', 
                    marginBottom: 16, 
                    alignItems: 'center' 
                  }}
                >
                  <View style={{ 
                    backgroundColor: '#F3F4F6', 
                    width: 56, 
                    height: 56, 
                    borderRadius: 28, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: 8 
                  }}>
                    <Ionicons name={category.icon} size={24} color="#4B5563" />
                  </View>
                  <Text style={{ textAlign: 'center' }}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Find Hospital Section */}
          <TouchableOpacity 
            style={{ 
              backgroundColor: '#EFF6FF', 
              padding: 16, 
              borderRadius: 8, 
              marginBottom: 24 
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="location" size={24} color="#1D4ED8" style={{ marginRight: 12 }} />
              <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  {t('Find nearest hospital')}
                </Text>
                <Text style={{ color: '#6B7280' }}>
                  {t('Locate emergency rooms and hospitals near you')}
                </Text>
              </View>
            </View>
            <View style={{ 
              backgroundColor: '#2563EB', 
              alignItems: 'center', 
              padding: 12, 
              borderRadius: 6 
            }}>
              <Text style={{ color: 'white', fontWeight: '500' }}>
                {t('Find Hospital')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
