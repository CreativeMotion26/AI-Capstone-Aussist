import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

const transportTypes = [
  {
    id: '1',
    title: 'Metro',
    desc: 'Sydney Metro services',
    iconType: 'text',
    iconText: 'M',
    iconBg: '#00857c',
    iconColor: '#fff',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/metro'
  },
  {
    id: '2',
    title: 'Train',
    desc: 'Train services across Sydney and NSW',
    iconType: 'text',
    iconText: 'T',
    iconBg: '#e87722',
    iconColor: '#fff',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/train'
  },
  {
    id: '3',
    title: 'Bus',
    desc: 'Bus services across Sydney and NSW',
    iconType: 'text',
    iconText: 'B',
    iconBg: '#00a3e0',
    iconColor: '#fff',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/bus'
  },
  {
    id: '4',
    title: 'Ferry',
    desc: 'Sydney Harbour and coastal ferry services',
    iconType: 'text',
    iconText: 'F',
    iconBg: '#59bb47',
    iconColor: '#fff',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/ferry'
  },
  {
    id: '5',
    title: 'Light Rail',
    desc: 'Sydney Light Rail services',
    iconType: 'text',
    iconText: 'L',
    iconBg: '#e4002b',
    iconColor: '#fff',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/light-rail'
  },
  {
    id: '6',
    title: 'Drive',
    desc: 'Driving information and resources',
    iconType: 'icon',
    iconName: 'car',
    iconLib: 'Ionicons',
    iconBg: 'transparent',
    iconColor: '#222',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/drive'
  },
  {
    id: '7',
    title: 'Regional Transport',
    desc: 'Regional train and coach services',
    iconType: 'icon',
    iconName: 'bus-alt',
    iconLib: 'FontAwesome5',
    iconBg: 'transparent',
    iconColor: '#222',
    url: 'https://transportnsw.info/regional'
  },
  {
    id: '8',
    title: 'On Demand',
    desc: 'On-demand transport services',
    iconType: 'icon',
    iconName: 'map-marker',
    iconLib: 'FontAwesome',
    iconBg: 'transparent',
    iconColor: '#222',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/on-demand'
  },
  {
    id: '9',
    title: 'Taxis & Hire',
    desc: 'Taxi and vehicle hire services',
    iconType: 'icon',
    iconName: 'taxi',
    iconLib: 'FontAwesome',
    iconBg: 'transparent',
    iconColor: '#222',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/taxi-hire-vehicle'
  },
  {
    id: '10',
    title: 'Community Transport',
    desc: 'Community transport services',
    iconType: 'icon',
    iconName: 'bus',
    iconLib: 'FontAwesome',
    iconBg: 'transparent',
    iconColor: '#222',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/community-transport'
  },
  {
    id: '11',
    title: 'Walking & Cycling',
    desc: 'Walking and cycling information',
    iconType: 'icon',
    iconName: 'biking',
    iconLib: 'FontAwesome5',
    iconBg: 'transparent',
    iconColor: '#222',
    url: 'https://transportnsw.info/travel-info/ways-to-get-around/walking-bike-riding'
  }
];

export default function WaysToGetAround() {
  const handleCardPress = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Ways to Get Around',
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choose Your Transport</Text>
            <Text style={styles.headerSubtitle}>Select your preferred mode of transport</Text>
          </View>

          <View style={styles.servicesContainer}>
            {transportTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={styles.serviceCard}
                onPress={() => handleCardPress(type.url)}
              >
                <View style={[styles.iconContainer, { backgroundColor: type.iconBg }]}> 
                  {type.iconType === 'text' ? (
                    <Text style={[styles.iconText, { color: type.iconColor }]}>{type.iconText}</Text>
                  ) : type.iconLib === 'Ionicons' ? (
                    <Ionicons name={type.iconName as any} size={24} color={type.iconColor} />
                  ) : type.iconLib === 'FontAwesome' ? (
                    <FontAwesome name={type.iconName as any} size={24} color={type.iconColor} />
                  ) : type.iconLib === 'FontAwesome5' ? (
                    <FontAwesome5 name={type.iconName as any} size={24} color={type.iconColor} />
                  ) : (
                    <MaterialIcons name={type.iconName as any} size={24} color={type.iconColor} />
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.serviceTitle}>{type.title}</Text>
                  <Text style={styles.serviceDesc}>{type.desc}</Text>
                </View>
                <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
              </TouchableOpacity>
            ))}
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
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  servicesContainer: {
    padding: 15,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  serviceDesc: {
    fontSize: 14,
    color: '#000',
  },
}); 