import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../_lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TText from '../../_components/TText';
import { Text } from 'react-native';
import { useTranslation } from '../../_context/TranslationContext';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function EmergencyPage() {
  const insets = useSafeAreaInsets();
  const { translatedTexts } = useTranslation();

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number.replace(/\s/g, '')}`);
  };

  const emergencyContacts = [
    { number: '000',         title: 'Emergency Services',  description: 'Police, Fire, Ambulance',                  icon: 'call'   as IconName },
    { number: '131 444',     title: 'Police Assistance',   description: 'Non-emergency police assistance',         icon: 'shield' as IconName },
    { number: '1800 022 222',title: 'Health Direct',       description: '24/7 health advice and information',      icon: 'medical'as IconName }
  ];

  const symptomCategories = [
    { name: 'Fever & Flu',   icon: 'thermometer-outline' as IconName },
    { name: 'Injuries',      icon: 'bandage-outline'     as IconName },
    { name: 'Chest Pain',    icon: 'heart-outline'       as IconName },
    { name: 'Breathing',     icon: 'fitness-outline'     as IconName },
    { name: 'Stomach',       icon: 'medical-outline'     as IconName },
    { name: 'Mental Health', icon: 'brain-outline'       as IconName }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />

      {/* header */}
      <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{translatedTexts['Emergency Services'] || 'Emergency Services'}</Text>
        <TText style={{ fontSize: 16, color: 'white' }}>{translatedTexts['Quick access to emergency contacts and nearby hospitals'] || 'Quick access to emergency contacts and nearby hospitals'}</TText>
      </View>

      <ScrollView>
        <View style={{ padding: 16 }}>

          {/* alert banner */}
          <View style={{
            backgroundColor: '#FEF2F2',
            borderLeftWidth: 8,
            borderLeftColor: '#DC2626',
            padding: 16,
            borderRadius: 6,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Ionicons name="warning" size={24} color="#DC2626" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <TText style={{ fontWeight: 'bold', color: '#B91C1C', marginBottom: 4, flexWrap: 'wrap' }}>
                {translatedTexts['In an emergency, call 000'] || 'In an emergency, call 000'}
              </TText>
              <TText style={{ color: '#B91C1C', flexWrap: 'wrap' }}>
                {translatedTexts['For life-threatening situations, call Triple Zero immediately'] || 'For life-threatening situations, call Triple Zero immediately'}
              </TText>
            </View>
          </View>

          {/* emergency contacts */}
          <View style={{ marginBottom: 24 }}>
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{translatedTexts['Emergency Contacts'] || 'Emergency Contacts'}</TText>

            {emergencyContacts.map((c, i) => (
              <View
                key={i}
                style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 8,
                  marginBottom: 12,
                }}>
                <View style={{
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: '#FEE2E2',
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name={c.icon} size={20} color="#DC2626" />
                </View>
                <View style={{ flex: 1 }}>
                  <TText style={{ fontWeight: 'bold', marginBottom: 4 }}>{translatedTexts[c.title] || c.title}</TText>
                  <TText style={{ color: '#6B7280' }}>{translatedTexts[c.description] || c.description}</TText>
                </View>
                </View>
                
                <View style={{
                  borderTopWidth: 1,
                  borderTopColor: '#E5E7EB',
                  padding: 12,
                  backgroundColor: '#F9FAFB'
                }}>
                  <TouchableOpacity 
                    onPress={() => handleCall(c.number)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TText style={{ color: '#000000', marginRight: 8 }}>{translatedTexts['Click to call'] || 'Click to call'}</TText>
                    <Ionicons name="call" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
                    <TText style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{c.number}</TText>
              </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Mental Health Helpline */}
          <View style={{ marginBottom: 24 }}>
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{translatedTexts['Mental Health Helpline'] || 'Mental Health Helpline'}</TText>
            
            {/* Lifeline */}
            <View style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              marginBottom: 12,
            }}>
              <View style={{
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: '#FEE2E2',
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name="heart" size={20} color="#DC2626" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Lifeline</Text>
                  <TText style={{ color: '#6B7280' }}>{translatedTexts['24/7 crisis support and suicide prevention'] || '24/7 crisis support and suicide prevention'}</TText>
                </View>
              </View>
              
              <View style={{
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
                padding: 12,
                backgroundColor: '#F9FAFB'
              }}>
                <TouchableOpacity 
                  onPress={() => handleCall('13 11 14')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <TText style={{ color: '#000000', marginRight: 8 }}>{translatedTexts['Click to call'] || 'Click to call'}</TText>
                  <Ionicons name="call" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
                  <TText style={{ color: theme.colors.primary, fontWeight: 'bold' }}>13 11 14</TText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Kids Helpline */}
            <View style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              marginBottom: 12,
            }}>
              <View style={{
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: '#FEE2E2',
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name="people" size={20} color="#DC2626" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Kids Helpline</Text>
                  <TText style={{ color: '#6B7280' }}>{translatedTexts['24/7 counselling for young people'] || '24/7 counselling for young people'}</TText>
                </View>
              </View>
              
              <View style={{
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
                padding: 12,
                backgroundColor: '#F9FAFB'
              }}>
                <TouchableOpacity 
                  onPress={() => handleCall('1800 55 1800')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <TText style={{ color: '#000000', marginRight: 8 }}>{translatedTexts['Click to call'] || 'Click to call'}</TText>
                  <Ionicons name="call" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
                  <TText style={{ color: theme.colors.primary, fontWeight: 'bold' }}>1800 55 1800</TText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
