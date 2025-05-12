import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useTranslation } from '../../../_context/TranslationContext';

const appStores = {
  android: {
    lite: 'https://play.google.com/store/apps/details?id=com.grofsoft.tripview.lite&hl=en_AU',
    full: 'https://play.google.com/store/apps/details?id=com.grofsoft.tripview&hl=en_AU'
  },
  ios: {
    lite: 'https://apps.apple.com/au/app/tripview-lite/id312389512',
    full: 'https://apps.apple.com/au/app/tripview/id294730339'
  }
};

export default function RoutesAndTimetables() {
  const { selectedLanguage, translateAll, registerText, translatedTexts } = useTranslation();

  useEffect(() => {
    // 번역할 텍스트 등록
    registerText("Routes and Timetables");
    registerText("Plan Your Journey");
    registerText("Find routes and check timetables");
    registerText("The official Sydney transport app");
    registerText("TripView is the most popular transport app for Sydney, providing real-time information for trains, buses, ferries and light rail. Features include:");
    registerText("TripView Lite (Free)");
    registerText("Basic features with ads");
    registerText("TripView (Paid)");
    registerText("Full features without ads");
    registerText("Real-time service updates and delays");
    registerText("Interactive maps and trip planning");
    registerText("Offline timetable access");
    registerText("Trackwork and service interruption information");
    registerText("Multi-modal trip editor");
  }, []);

  useEffect(() => {
    translateAll(selectedLanguage);
  }, [selectedLanguage]);

  const handleLearnMore = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: translatedTexts["Routes and Timetables"] || "Routes and Timetables",
          headerBackTitle: 'Back',
          headerShown: false
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {translatedTexts["Routes and Timetables"] || "Routes and Timetables"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {translatedTexts["Find routes and check timetables"] || "Find routes and check timetables"}
            </Text>
          </View>

          <View style={styles.appSection}>
            <View style={styles.appHeader}>
              <Image 
                source={require('../../../assets/images/tripview.png')} 
                style={styles.appIcon}
              />
              <View style={styles.appHeaderText}>
                <Text style={styles.appTitle}>
                  {translatedTexts["TripView App"] || "TripView App"}
                </Text>
                <Text style={styles.appSubtitle}>
                  {translatedTexts["The official Sydney transport app"] || "The official Sydney transport app"}
                </Text>
              </View>
            </View>
            <Text style={styles.appDescription}>
              {translatedTexts["TripView is the most popular transport app for Sydney, providing real-time information for trains, buses, ferries and light rail. Features include:"] || 
               "TripView is the most popular transport app for Sydney, providing real-time information for trains, buses, ferries and light rail. Features include:"}
            </Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureItem}>• {translatedTexts["Real-time service updates and delays"] || "Real-time service updates and delays"}</Text>
              <Text style={styles.featureItem}>• {translatedTexts["Interactive maps and trip planning"] || "Interactive maps and trip planning"}</Text>
              <Text style={styles.featureItem}>• {translatedTexts["Offline timetable access"] || "Offline timetable access"}</Text>
              <Text style={styles.featureItem}>• {translatedTexts["Trackwork and service interruption information"] || "Trackwork and service interruption information"}</Text>
              <Text style={styles.featureItem}>• {translatedTexts["Multi-modal trip editor"] || "Multi-modal trip editor"}</Text>
            </View>
            <View style={styles.appButtons}>
              <View style={styles.appVersionSection}>
                <Text style={styles.appVersionTitle}>
                  {translatedTexts["TripView Lite (Free)"] || "TripView Lite (Free)"}
                </Text>
                <Text style={styles.appVersionSubtitle}>
                  {translatedTexts["Basic features with ads"] || "Basic features with ads"}
                </Text>
                <View style={styles.downloadContainer}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(appStores.ios.lite)}
                    style={styles.textStoreButton}
                  >
                    <Image
                      source={require('../../../assets/images/appstore.jpg')}
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
              <TouchableOpacity
                    onPress={() => Linking.openURL(appStores.android.lite)}
                    style={styles.textStoreButton}
                  >
                    <Image
                      source={require('../../../assets/images/googleplay.jpg')}
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.appVersionSection}>
                <Text style={styles.appVersionTitle}>
                  {translatedTexts["TripView (Paid)"] || "TripView (Paid)"}
                </Text>
                <Text style={styles.appVersionSubtitle}>
                  {translatedTexts["Full features without ads"] || "Full features without ads"}
                </Text>
                <View style={styles.downloadContainer}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(appStores.ios.full)}
                    style={styles.textStoreButton}
                  >
                    <Image
                      source={require('../../../assets/images/appstore.jpg')}
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(appStores.android.full)}
                    style={styles.textStoreButton}
                  >
                    <Image
                      source={require('../../../assets/images/googleplay.jpg')}
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  appSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
  },
  appHeaderText: {
    flex: 1,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10,
  },
  appButtons: {
    gap: 20,
  },
  appVersionSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  appVersionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  appVersionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  downloadContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  textStoreButton: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
}); 