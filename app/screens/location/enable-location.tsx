import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView, Alert, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useTranslation } from '../../_context/TranslationContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function EnableLocationScreen() {
  const insets = useSafeAreaInsets();
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    registerText('Find Hospital');
    registerText('Locate nearby medical facilities');
    registerText('Enable Location Services');
    registerText('Your location services are switched off. Please enable location to use the Find Hospital service.');
    registerText('Deny');
    registerText('Allow');
    registerText('We need the location authority');
    registerText('In order to use the service, we need the location authority');
    registerText('got it');
    registerText("If you don't need a location-based service with a map, you can look up services on Healthdirect.");
    registerText('Find your services on Healthdirect');
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleEnableLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      router.replace('/screens/hospital');
    } else {
      Alert.alert(
        translatedTexts['We need the location authority'] || 'We need the location authority',
        translatedTexts['In order to use the service, we need the location authority'] || 'In order to use the service, we need the location authority',
        [
          { text: translatedTexts['got it'] || 'got it', onPress: () => router.replace('/screens/home') },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: 8, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <TText style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{translatedTexts['Find Hospital'] || 'Find Hospital'}</TText>
        <TText style={{ fontSize: 16, color: 'white' }}>{translatedTexts['Locate nearby medical facilities'] || 'Locate nearby medical facilities'}</TText>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <TText style={styles.title}>{translatedTexts['Enable Location Services'] || 'Enable Location Services'}</TText>
          <Image
            source={require('../../assets/images/Hospital.jpg')}
            style={styles.image}
          />
          <TText style={styles.description}>
            {translatedTexts['Your location services are switched off. Please enable location to use the Find Hospital service.'] || 'Your location services are switched off. Please enable location to use the Find Hospital service.'}
          </TText>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.denyButton} onPress={() => router.replace('/screens/home')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="close" size={25} color="#EF4444" style={{ marginRight: 4 }} />
                <TText style={styles.denyButtonText}>{translatedTexts['Deny'] || 'Deny'}</TText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.allowButton} onPress={handleEnableLocation}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="checkmark" size={25} color="#22C55E" style={{ marginRight: 4 }} />
                <TText style={styles.allowButtonText}>{translatedTexts['Allow'] || 'Allow'}</TText>
              </View>
            </TouchableOpacity>
          </View>
          {/* 위치기반 서비스가 필요 없는 사용자를 위한 안내 카드 */}
          <View style={styles.infoCard}>
            <TText style={styles.infoText}>
              {translatedTexts["If you don't need a location-based service with a map, you can look up services on Healthdirect."] || "If you don't need a location-based service with a map, you can look up services on Healthdirect."}
            </TText>
            <TouchableOpacity
              style={styles.healthdirectButton}
              onPress={() => {
                let url = 'https://www.healthdirect.gov.au/australian-health-services';
                if (selectedLanguage === 'ko') url = 'https://www.healthdirect.gov.au/australian-health-services/ko';
                else if (selectedLanguage === 'vi') url = 'https://www.healthdirect.gov.au/australian-health-services/vi';
                Linking.openURL(url);
              }}
            >
              <TText style={styles.healthdirectButtonText}>{translatedTexts['Find your services on Healthdirect'] || 'Find your services on Healthdirect'}</TText>
              <MaterialIcons name="open-in-new" size={20} color="#1976D2" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  denyButton: {
    backgroundColor: '#FFF',
    borderColor: '#666',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 48,
    paddingLeft: 40,
    marginRight: 20,
  },
  denyButtonText: {
    color: '#222',
    fontSize: 17,
    fontWeight: 'bold',
  },
  allowButton: {
    backgroundColor: '#FFF',
    borderColor: '#666',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 48,
    paddingLeft: 40,
  },
  allowButtonText: {
    color: '#222',
    fontSize: 17,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 16,
  },
  healthdirectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  healthdirectButtonText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 