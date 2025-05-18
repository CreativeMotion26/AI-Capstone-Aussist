// index.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Keyboard,
  Animated,
  Dimensions,
  Clipboard,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTranslation } from '../../_context/TranslationContext';
import { searchNearbyHospitals, searchNearbyPharmacies, searchPlaces } from '../../_maps/maps';
import TText from '../../_components/TText';
import { theme } from '../../_lib/theme';

// opening_hours 처리 유틸
function getNextOpeningTime(periods: { open: { day: number; time: string } }[]): string | null {
  const now = new Date();
  const today = now.getDay();
  const currentHHMM = now.getHours() * 100 + now.getMinutes();

  const todayPeriod = periods.find(p => p.open.day === today);
  if (todayPeriod) {
    const openHHMM = parseInt(todayPeriod.open.time, 10);
    if (currentHHMM < openHHMM) return todayPeriod.open.time;
  }
  for (let i = 1; i <= 7; i++) {
    const day = (today + i) % 7;
    const next = periods.find(p => p.open.day === day);
    if (next) return next.open.time;
  }
  return null;
}

function getClosingTime(periods: { open?: { day: number; time?: string }; close?: { day: number; time?: string } }[]): string | null {
  const now = new Date();
  const today = now.getDay();
  const currentHHMM = now.getHours() * 100 + now.getMinutes();

  const todayPeriod = periods.find(
    p => p.open && p.close && p.open.day === today && p.open.time && p.close.time
  );
  if (todayPeriod) {
    const openHHMM = parseInt(todayPeriod.open.time!, 10);
    const closeHHMM = parseInt(todayPeriod.close.time!, 10);
    if (currentHHMM >= openHHMM && currentHHMM < closeHHMM) return todayPeriod.close.time!;
  }
  return null;
}

function formatHHMM(hhmm: string | null): string {
  if (!hhmm) return '';
  const s = hhmm.padStart(4, '0');
  return s.slice(0, 2) + ':' + s.slice(2);
}

const GOOGLE_API_KEY = 'AIzaSyCrKTP8_dWdVVprq4zdt5N17PmiOdNSYac';
const pharmacyKeywords = ['pharmacy', '약국', 'nhà thuốc', 'hiệu thuốc'];
const hospitalKeywords = ['hospital', '병원', 'bệnh viện'];

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Hospital() {
  const { selectedLanguage } = useTranslation();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState<Region | null>(null);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const screenHeight = Dimensions.get('window').height;
  const animatedHeight = useRef(new Animated.Value(screenHeight * 0.25)).current;

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? screenHeight * 0.20 : screenHeight * 0.62,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    (async () => {
      let lat = -33.8688, lng = 151.2093;
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        lat = loc.coords.latitude;
        lng = loc.coords.longitude;
      }
      setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 });
      fetchNearbyHospitals(lat, lng);
    })();
  }, []);

  const fetchNearbyHospitals = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await searchNearbyHospitals(lat, lng);
      setHospitals(res.results || []);
    } catch {
      setHospitals([]);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchText) return;
    setLoading(true);
    try {
      const text = searchText.toLowerCase();
      let res;
      if (pharmacyKeywords.some(k => text.includes(k))) {
        res = await searchNearbyPharmacies(region!.latitude, region!.longitude);
      } else if (hospitalKeywords.some(k => text.includes(k))) {
        res = await searchNearbyHospitals(region!.latitude, region!.longitude);
      } else {
        res = await searchPlaces(searchText, region?.latitude, region?.longitude);
      }
      setHospitals(res.results || []);
      if (res.results?.length) {
        const loc = res.results[0].geometry.location;
        setRegion({
          latitude: loc.lat,
          longitude: loc.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    } catch {
      setHospitals([]);
    }
    setLoading(false);
    Keyboard.dismiss();
  };

  const handleCall = (phone: string) => Linking.openURL(`tel:${phone}`);
  const copyToClipboard = (text: string) => Clipboard.setString(text);

  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5CC6FF" />
      </View>
    );
  }

  const bottomOffset = insets.bottom;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TText style={styles.headerTitle}>Find Medical Services near you</TText>
        <TText style={styles.headerSubtitle}>Locate nearby medical facilities</TText>
      </View>

      <View style={[styles.searchBoxWrap, { top: insets.top + 78 }]}>
        <Ionicons name="search" size={18} color="#888" style={{ marginHorizontal: 4 }} />
        <TextInput
          style={styles.textInput}
          placeholder="Search hospital or address..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
          <Ionicons name="arrow-forward" size={20} color="#1976D2" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.mapContainer,
          { top: insets.top + 70, bottom: Animated.add(bottomOffset, animatedHeight) },
        ]}
      >
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={region}
          showsUserLocation
          showsMyLocationButton
        >
          {hospitals.map((h, idx) => (
            <Marker
              key={h.place_id || idx}
              coordinate={{ latitude: h.geometry.location.lat, longitude: h.geometry.location.lng }}
              title={h.name}
              description={h.vicinity}
            />
          ))}
        </MapView>
      </Animated.View>

      <Animated.View
        style={[styles.hospitalListContainer, { bottom: bottomOffset, height: animatedHeight }]}
      >
        <View style={styles.hospitalListHeader}>
          <Text style={styles.hospitalListTitle}>Hospitals/Pharmacies Near You</Text>
          <TouchableOpacity style={styles.seeAllButton} onPress={toggleExpand}>
            <Ionicons
              name={isExpanded ? 'chevron-down' : 'chevron-up'}
              size={22}
              color="#1976D2"
              style={styles.seeAllIcon}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#5CC6FF" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={hospitals}
            keyExtractor={item => item.place_id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.hospitalList}
            renderItem={({ item }) => {
              const periods = item.details?.opening_hours?.periods || [];
              const openNow = item.details?.opening_hours?.open_now;

              return (
                <TouchableOpacity
                  style={styles.hospitalCard}
                  onPress={() =>
                    setRegion({
                      latitude: item.geometry.location.lat,
                      longitude: item.geometry.location.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    })
                  }
                >
                  <View style={styles.hospitalCardContent}>
                    <Text style={styles.hospitalCardTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.addressContainer}>
                      <Text style={styles.hospitalCardAddress} numberOfLines={1} ellipsizeMode="tail">
                        {item.vicinity}
                      </Text>
                      <TouchableOpacity onPress={() => copyToClipboard(item.vicinity)} style={styles.copyButton}>
                        <Ionicons name="copy-outline" size={16} color="#64748B" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.hospitalCardBottomRow}>
                      {item.rating && (
                        <View style={styles.hospitalCardRating}>
                          <Ionicons name="star" size={14} color="#FFD700" />
                          <Text style={styles.hospitalCardRatingText}>{item.rating}</Text>
                          {item.user_ratings_total && (
                            <Text style={styles.hospitalCardReviews}>({item.user_ratings_total})</Text>
                          )}
                        </View>
                      )}
                      {item.details?.formatted_phone_number && (
                        <View style={styles.hospitalCardDetailItem}>
                          <Text style={styles.hospitalCardDetailText}>Click to call</Text>
                          <Ionicons name="call-outline" size={14} color="#64748B" style={{ marginLeft: 4 }} />
                          <TouchableOpacity onPress={() => handleCall(item.details.formatted_phone_number)}>
                            <Text style={[styles.hospitalCardDetailText, styles.phoneNumber]}>
                              {item.details.formatted_phone_number}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>

                    {item.details?.opening_hours && (
                      <View style={styles.hospitalCardDetails}>
                        <View style={styles.hospitalCardDetailRow}>
                          {openNow !== undefined && (
                            <View style={styles.hospitalCardDetailItem}>
                              <Ionicons
                                name={openNow ? 'time' : 'time-outline'}
                                size={14}
                                color={openNow ? '#22C55E' : '#EF4444'}
                              />
                              <Text
                                style={[
                                  styles.hospitalCardDetailText,
                                  { color: openNow ? '#22C55E' : '#EF4444' },
                                ]}
                              >
                                {openNow ? 'Open' : 'Closed'}
                              </Text>
                            </View>
                          )}
                          {openNow && periods.length > 0 && getClosingTime(periods) && (
                            <Text style={styles.hospitalCardTimeText}>
                              Closes at {formatHHMM(getClosingTime(periods))}
                            </Text>
                          )}
                          {!openNow && periods.length > 0 && getNextOpeningTime(periods) && (
                            <Text style={styles.hospitalCardTimeText}>
                              Opens at {formatHHMM(getNextOpeningTime(periods))}
                            </Text>
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', position: 'relative' },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
  },
  mapContainer: { 
    position: 'absolute', 
    left: 0, 
    right: 0,
  },
  map: { ...StyleSheet.absoluteFillObject },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchBoxWrap: {
    position: 'absolute',
    left: 12,
    right: 60,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    paddingVertical: 3,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: { flex: 1, height: 40, fontSize: 16, paddingLeft: 4, backgroundColor: 'transparent' },
  searchBtn: { paddingHorizontal: 6, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' },
  hospitalListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    paddingTop: 16,
    paddingBottom: 8,
  },
  hospitalListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  hospitalListTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  seeAllButton: { flexDirection: 'row', alignItems: 'center' },
  seeAllIcon: { marginLeft: 4 },
  hospitalList: { paddingHorizontal: 16, paddingBottom: 16 },
  hospitalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  hospitalCardContent: { flex: 1 },
  hospitalCardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  addressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  hospitalCardAddress: { flex: 1, color: '#6B7280', marginRight: 8 },
  copyButton: { padding: 4 },
  hospitalCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  hospitalCardRating: { flexDirection: 'row', alignItems: 'center' },
  hospitalCardRatingText: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginLeft: 4 },
  hospitalCardReviews: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  hospitalCardDetails: { marginTop: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 8 },
  hospitalCardDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hospitalCardDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalCardDetailText: { fontSize: 12, color: '#64748B', marginLeft: 6 },
  phoneNumber: { textDecorationLine: 'underline' },
  hospitalCardTimeText: {
    color: '#1F2937',
    fontWeight: '500',
    marginLeft: 'auto',
  },
});
