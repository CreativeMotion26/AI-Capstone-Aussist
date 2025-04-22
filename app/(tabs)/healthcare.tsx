import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../context/TranslationContext';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const facilities = [
  {
    name: 'Royal Prince Alfred Hospital',
    type: 'Public Hospital',
    address: '50 Missenden Rd, Camperdown',
    distance: '1.2 km',
    services: ['Emergency', 'Surgery', 'Maternity'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500'
  },
  {
    name: 'St Vincent\'s Hospital',
    type: 'Public Hospital',
    address: '390 Victoria St, Darlinghurst',
    distance: '2.5 km',
    services: ['Emergency', 'Cancer Care', 'Heart Centre'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=500'
  },
  {
    name: 'Sydney Medical Centre',
    type: 'Medical Clinic',
    address: '123 Pitt Street, Sydney',
    distance: '3.1 km',
    services: ['General Practice', 'Pathology', 'Vaccination'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500'
  }
];

const healthServices = [
  { title: 'Hospitals', icon: 'medkit-outline' as IconName },
  { title: 'Pharmacies', icon: 'medical-outline' as IconName },
  { title: 'Mental Health', icon: 'heart-outline' as IconName },
  { title: 'Medicare', icon: 'card-outline' as IconName },
  { title: 'Dentists', icon: 'fitness-outline' as IconName },
  { title: 'COVID-19', icon: 'shield-outline' as IconName },
];

export default function HealthcarePage() {
  const insets = useSafeAreaInsets();
  const { translatedTexts } = useTranslation();
  const t = (key: string) => translatedTexts[key] || key;

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
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{t('Healthcare Services')}</Text>
      </View>

      <ScrollView>
        <View style={{ padding: 16 }}>
          
          {/* Service Categories */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{t('Healthcare Services')}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {healthServices.map((service, index) => (
                <TouchableOpacity key={index} style={{ width: '30%', marginBottom: 16, alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: '#E0F2FE',
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8
                  }}>
                    <Ionicons name={service.icon} size={24} color="#0284C7" />
                  </View>
                  <Text style={{ textAlign: 'center' }}>{t(service.title)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Map Preview */}
          <View style={{
            height: 120,
            backgroundColor: '#E0F2FE',
            borderRadius: 8,
            marginBottom: 24,
            padding: 16,
            justifyContent: 'flex-end'
          }}>
            <Text style={{ fontWeight: 'bold' }}>{t('Nearby Facilities')}</Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>{t('Based on your current location')}</Text>
          </View>

          {/* Facility List */}
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{t('Nearby Facilities')}</Text>
              <TouchableOpacity>
                <Text style={{ color: theme.colors.primary }}>{t('View all')}</Text>
              </TouchableOpacity>
            </View>

            {facilities.map((facility, index) => (
              <View key={index} style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 8,
                marginBottom: 12,
                overflow: 'hidden'
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={{ uri: facility.image }} style={{ width: 100, height: 100 }} />
                  <View style={{ flex: 1, padding: 12 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{facility.name}</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                      <Text style={{ fontSize: 12, color: '#3B82F6' }}>{facility.type}</Text>
                      <Text style={{ fontSize: 12, color: '#9CA3AF', marginHorizontal: 4 }}>•</Text>
                      <Text style={{ fontSize: 12, color: '#6B7280' }}>{facility.distance}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{facility.address}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {facility.services.map((service, i) => (
                        <View key={i} style={{
                          backgroundColor: '#F3F4F6',
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 12,
                          marginRight: 4,
                          marginBottom: 4
                        }}>
                          <Text style={{ fontSize: 10 }}>{t(service)}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
                  <TouchableOpacity style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#E5E7EB',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                    <Ionicons name="call-outline" size={16} color="#6B7280" style={{ marginRight: 4 }} />
                    <Text>{t('Call')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#E5E7EB',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                    <Ionicons name="navigate-outline" size={16} color="#6B7280" style={{ marginRight: 4 }} />
                    <Text>{t('Directions')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}>
                    <Ionicons name="information-circle-outline" size={16} color="#6B7280" style={{ marginRight: 4 }} />
                    <Text>{t('Details')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Medicare Info */}
          <TouchableOpacity style={{
            backgroundColor: '#E0F2FE',
            padding: 16,
            borderRadius: 8,
            marginBottom: 24
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="card" size={24} color="#0284C7" style={{ marginRight: 12 }} />
              <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{t('Medicare Information')}</Text>
                <Text style={{ color: '#6B7280' }}>{t('Learn about Medicare coverage and how to apply')}</Text>
              </View>
            </View>
            <View style={{
              backgroundColor: '#0284C7',
              alignItems: 'center',
              padding: 12,
              borderRadius: 6
            }}>
              <Text style={{ color: 'white', fontWeight: '500' }}>{t('Learn More')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
