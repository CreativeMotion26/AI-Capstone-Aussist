import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const routesAndTimetables = [
  {
    id: '1',
    title: 'Trip Planner',
    iconType: 'icon',
    iconName: 'map',
    iconBg: 'transparent',
    iconColor: '#222',
    description: 'Plan your journey with real-time updates',
    url: 'https://transportnsw.info/trip'
  },
  {
    id: '2',
    title: 'Metro & Train',
    iconType: 'text',
    iconText: 'M',
    iconBg: '#00857c',
    iconColor: '#fff',
    description: 'Check metro and train timetables',
    content: [
      { line: 'T1 North Shore & Western Line', url: 'https://transportnsw.info/routes/detail/train/T1/1' },
      { line: 'T2 Inner West & Leppington Line', url: 'https://transportnsw.info/routes/detail/train/T2/2' },
      { line: 'T3 Bankstown Line', url: 'https://transportnsw.info/routes/detail/train/T3/3' },
      { line: 'T4 Eastern Suburbs & Illawarra Line', url: 'https://transportnsw.info/routes/detail/train/T4/4' },
      { line: 'T5 Cumberland Line', url: 'https://transportnsw.info/routes/detail/train/T5/5' },
      { line: 'T7 Olympic Park Line', url: 'https://transportnsw.info/routes/detail/train/T7/7' },
      { line: 'T8 Airport & South Line', url: 'https://transportnsw.info/routes/detail/train/T8/8' },
      { line: 'T9 Northern Line', url: 'https://transportnsw.info/routes/detail/train/T9/9' }
    ]
  },
  {
    id: '3',
    title: 'Bus',
    iconType: 'text',
    iconText: 'B',
    iconBg: '#00a3e0',
    iconColor: '#fff',
    description: 'Find bus routes and schedules',
    content: [
      { region: 'Sydney', url: 'https://transportnsw.info/routes/bus/sydney' },
      { region: 'Newcastle', url: 'https://transportnsw.info/routes/bus/newcastle' },
      { region: 'Central Coast', url: 'https://transportnsw.info/routes/bus/central-coast' },
      { region: 'Blue Mountains', url: 'https://transportnsw.info/routes/bus/blue-mountains' },
      { region: 'Illawarra', url: 'https://transportnsw.info/routes/bus/illawarra' }
    ]
  },
  {
    id: '4',
    title: 'Ferry',
    iconType: 'text',
    iconText: 'F',
    iconBg: '#59bb47',
    iconColor: '#fff',
    description: 'View ferry timetables and routes',
    content: [
      { route: 'Manly', url: 'https://transportnsw.info/routes/ferry/manly' },
      { route: 'Parramatta River', url: 'https://transportnsw.info/routes/ferry/parramatta-river' },
      { route: 'Inner Harbour', url: 'https://transportnsw.info/routes/ferry/inner-harbour' },
      { route: 'Sydney Harbour', url: 'https://transportnsw.info/routes/ferry/sydney-harbour' }
    ]
  },
  {
    id: '5',
    title: 'Light Rail',
    iconType: 'text',
    iconText: 'L',
    iconBg: '#e4002b',
    iconColor: '#fff',
    description: 'Check light rail schedules',
    content: [
      { line: 'L1 Dulwich Hill Line', url: 'https://transportnsw.info/routes/light-rail/l1' },
      { line: 'L2 Randwick Line', url: 'https://transportnsw.info/routes/light-rail/l2' },
      { line: 'L3 Kingsford Line', url: 'https://transportnsw.info/routes/light-rail/l3' }
    ]
  }
];

export default function RoutesAndTimetables({ navigation }) {
  const handleCardPress = (url) => {
    if (url) {
      navigation.navigate('TransportWebView', { url });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleCardPress(item.url)}
        >
          <View style={styles.cardContent}>
            {item.id === '1' ? (
              <View style={[styles.iconContainer, { backgroundColor: item.iconBg, marginRight: 23, marginLeft: 4 }]}>
                <Ionicons name={item.iconName} size={24} color={item.iconColor} />
              </View>
            ) : item.id === '2' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
                <View style={[styles.iconTextContainer, { backgroundColor: '#00857c', zIndex: 2 }]}>
                  <Text style={[styles.iconText, { color: '#fff' }]}>M</Text>
                </View>
                <View style={[styles.iconTextContainer, { backgroundColor: '#e87722', marginLeft: -12, zIndex: 1 }]}>
                  <Text style={[styles.iconText, { color: '#fff' }]}>T</Text>
                </View>
              </View>
            ) : (
              <View style={[styles.iconContainer, { marginRight: 23, marginLeft: 4 }]}>
                <View style={[styles.iconTextContainer, { backgroundColor: item.iconBg }]}>
                  <Text style={[styles.iconText, { color: item.iconColor }]}>{item.iconText}</Text>
                </View>
              </View>
            )}
            <View style={[styles.textContainer, item.id !== '2' && { marginLeft: -4 }]}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Plan your journey and check timetables
        </Text>
      </View>
      <FlatList
        data={routesAndTimetables}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconTextContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  cardDesc: {
    fontSize: 13,
    color: '#888',
  },
});
