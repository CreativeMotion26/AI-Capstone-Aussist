import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

const routeOptions = [
  {
    id: '0',
    title: 'Metro Routes',
    desc: 'Explore Sydney Metro train lines and schedules',
    iconType: 'text',
    iconText: 'M',
    iconBg: '#00857c',
    iconColor: '#fff',
    iconSize: 26,
    content: [
      { line: 'Metro North West Line', url: 'https://transportnsw.info/routes/metro/north-west' },
      { line: 'Metro City & Southwest', url: 'https://transportnsw.info/routes/metro/city-southwest' },
      { line: 'Metro West', url: 'https://transportnsw.info/routes/metro/west' }
    ]
  },
  {
    id: '1',
    title: 'Train Routes',
    desc: 'Find train routes and schedules',
    iconType: 'text',
    iconText: 'T',
    iconBg: '#e87722',
    iconColor: '#fff',
    iconSize: 26,
    content: [
      { region: 'Sydney', url: 'https://transportnsw.info/routes/train/sydney' },
      { region: 'Newcastle', url: 'https://transportnsw.info/routes/train/newcastle' },
      { region: 'Central Coast', url: 'https://transportnsw.info/routes/train/central-coast' }
    ]
  },
  {
    id: '2',
    title: 'Bus Routes',
    desc: 'Find bus routes and schedules',
    iconType: 'text',
    iconText: 'B',
    iconBg: '#00a3e0',
    iconColor: '#fff',
    iconSize: 26,
    content: [
      { region: 'Sydney', url: 'https://transportnsw.info/routes/bus/sydney' },
      { region: 'Newcastle', url: 'https://transportnsw.info/routes/bus/newcastle' },
      { region: 'Central Coast', url: 'https://transportnsw.info/routes/bus/central-coast' }
    ]
  },
  {
    id: '3',
    title: 'Ferry Routes',
    desc: 'View ferry timetables and routes',
    iconType: 'text',
    iconText: 'F',
    iconBg: '#59bb47',
    iconColor: '#fff',
    iconSize: 26,
    content: [
      { route: 'Manly', url: 'https://transportnsw.info/routes/ferry/manly' },
      { route: 'Parramatta River', url: 'https://transportnsw.info/routes/ferry/parramatta-river' },
      { route: 'Inner Harbour', url: 'https://transportnsw.info/routes/ferry/inner-harbour' }
    ]
  },
  {
    id: '4',
    title: 'Light Rail',
    desc: 'Check light rail schedules',
    iconType: 'text',
    iconText: 'L',
    iconBg: '#e4002b',
    iconColor: '#fff',
    iconSize: 26,
    content: [
      { line: 'L1 Dulwich Hill Line', url: 'https://transportnsw.info/routes/light-rail/l1' },
      { line: 'L2 Randwick Line', url: 'https://transportnsw.info/routes/light-rail/l2' },
      { line: 'L3 Kingsford Line', url: 'https://transportnsw.info/routes/light-rail/l3' }
    ]
  },
  {
    id: '5',
    title: 'Trip Planner',
    desc: 'Plan your journey',
    icon: 'route',
    color: '#9C27B0',
    iconSize: 28,
    content: [
      { type: 'Plan Trip', url: 'https://transportnsw.info/trip' },
      { type: 'Live Traffic', url: 'https://www.livetraffic.com' }
    ]
  }
];

export default function RoutesAndTimetables() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Routes and Timetables',
          headerBackTitle: 'Back'
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Transport Routes</Text>
            <Text style={styles.headerSubtitle}>Find routes and timetables for your journey</Text>
          </View>

          <View style={styles.servicesContainer}>
            {routeOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.serviceCard]}
                onPress={() => router.push(`/transport/3/${option.id}` as any)}
              >
                <View style={[styles.iconContainer, 
                  option.iconType === 'text' 
                    ? { backgroundColor: option.iconBg }
                    : option.id === '5' 
                      ? { backgroundColor: 'transparent' }
                      : { backgroundColor: option.color }
                ]}>
                  {option.iconType === 'text' ? (
                    <Text style={[styles.iconText, { 
                      color: option.iconColor,
                      fontSize: option.iconSize 
                    }]}>{option.iconText}</Text>
                  ) : (
                    <MaterialIcons 
                      name={option.icon as any} 
                      size={option.iconSize} 
                      color={option.id === '5' ? '#000' : '#fff'} 
                    />
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.serviceTitle, { color: '#000' }]}>{option.title}</Text>
                  <Text style={[styles.serviceDesc, { color: '#666' }]}>{option.desc}</Text>
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
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  serviceDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
}); 